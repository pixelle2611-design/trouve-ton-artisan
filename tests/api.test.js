import test from 'node:test';
import assert from 'node:assert/strict';
import express from 'express';
import { once } from 'node:events';
// Never initialize a real SMTP transport during the HTTP regression suite.
process.env.SMTP_HOST = '';
const { router } = await import('../server/routes/artisans.js');
import { Artisan, Category, db } from '../server/models.js';
import { onError } from '../server/middleware/errors.js';
import { createGateway } from '../server/middleware/gateway.js';
import { installSecurity } from '../server/middleware/security.js';

// Exercise real HTTP routing and middleware; SQL and SMTP are deliberately excluded.
test('API HTTP : données publiques, erreurs, origine, JSON et limitation', async (t) => {
  const original = { list: Artisan.findAll, detail: Artisan.findByPk, categories: Category.findAll };
  const artisan = { id: 1, name: 'Atelier', locality: { name: 'Lyon' }, specialty: { name: 'Menuisier' } };
  let mode = 'normal';
  Artisan.findAll = async (options) => { assert.ok(!options.attributes.includes('email')); assert.ok(options.include.some(join => join.as === 'locality')); if (mode === 'failure') throw new Error('secret SQL'); return [{ toJSON: () => artisan }]; };
  Artisan.findByPk = async (id) => id === '1' ? { toJSON: () => artisan, email: 'test@example.com' } : null;
  Category.findAll = async () => [{ id: 1, name: 'Bâtiment' }];
  const privateApp = express(); privateApp.use(express.json()); privateApp.use(router); privateApp.use(onError);
  const internal = privateApp.listen(0, '127.0.0.1'); await once(internal, 'listening');
  const app = express(); installSecurity(app);
  app.use('/api', createGateway({ privatePort: internal.address().port, key: 'test', origin: 'http://localhost:5173' }));
  app.use(onError);
  const server = app.listen(0, '127.0.0.1'); await once(server, 'listening');
  const base = `http://127.0.0.1:${server.address().port}/api`;
  const get = (url) => fetch(base + url);
  const post = (body, origin = 'http://localhost:5173') => fetch(base + '/artisans/1/contact', { method:'POST', headers:{'Content-Type':'application/json',origin}, body });
  try {
    await t.test('ville normalisée conservée dans le contrat public', async () => { const r=await get('/artisans'); assert.equal(r.status,200); const [a]=await r.json(); assert.equal(a.city,'Lyon'); assert.equal(a.locality,undefined); assert.equal(a.email,undefined); });
    await t.test('fiche existante et absence', async () => { assert.equal((await get('/artisans/1')).status,200); assert.equal((await get('/artisans/999')).status,404); });
    await t.test('recherche invalide et paramètres multiples', async () => { for (const url of ['/artisans?category=1&category=2','/artisans?q=%25','/artisans?top=false','/artisans?q=a&q=b']) assert.equal((await get(url)).status,400); });
    await t.test('routes non autorisées', async () => { assert.equal((await get('/admin')).status,404); });
    await t.test('origine étrangère rejetée', async () => { assert.equal((await post('{}','https://other.example')).status,403); });
    await t.test('champs absents rejetés', async () => { const r=await post('{}'); assert.equal(r.status,400); assert.ok((await r.json()).fields.email); });
    await t.test('JSON malformé et charge trop grande', async () => { assert.equal((await post('{')).status,400); assert.equal((await post(JSON.stringify({message:'x'.repeat(17000)}))).status,413); });
    await t.test('panne SQL masquée', async () => { mode='failure'; const r=await get('/artisans'); assert.equal(r.status,500); assert.doesNotMatch(await r.text(),/secret SQL|SELECT|password/i); mode='normal'; });
    await t.test('SMTP absent : aucun faux succès', async () => { const r=await post(JSON.stringify({name:'Camille',email:'test@example.com',subject:'Devis',message:'Bonjour'})); assert.equal(r.status,503); });
    await t.test('en-têtes de sécurité et limitation de contact', async () => { let r; for (let i=0;i<5;i++) r=await post('{}'); assert.equal(r.status,429); assert.ok(r.headers.get('content-security-policy')); assert.ok(r.headers.get('ratelimit')); });
  } finally {
    Artisan.findAll=original.list; Artisan.findByPk=original.detail; Category.findAll=original.categories;
    await Promise.all([new Promise(r=>server.close(r)),new Promise(r=>internal.close(r))]);
    await db.close();
  }
});
