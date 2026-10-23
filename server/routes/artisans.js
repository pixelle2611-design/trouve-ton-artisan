import { Router } from "express";
import { Op } from "sequelize";
import { Category, Specialty, City, Artisan } from "../models.js";
import { validId, contactErrors } from "../validation.js";
import { mailer } from "../services/mailer.js";
export const router = Router();
const cityJoin = { model: City, as: "locality", attributes: ["name"] };
const include = [{ model: Specialty, include: [Category] }, cityJoin];
// Conserver le contrat public city, tout en stockant chaque localité une seule fois.
const serialize = (row) => { const { locality, ...data } = row.toJSON(); return { ...data, city: locality.name }; };
const publicAttributes = [
  "id",
  "name",
  "rating",
  "about",
  "website",
  "top",
  "image",
];
router.get("/categories", async (req, res) =>
  res.json(await Category.findAll({ order: [["id", "ASC"]] })),
);
router.get("/artisans", async (req, res) => {
  const { category, q, top } = req.query;
  if (
    (category !== undefined && !validId(category)) ||
    (q !== undefined && (typeof q !== "string" || q.length > 100 || /[%_\\]/.test(q))) ||
    (top !== undefined && top !== "true")
  )
    return res.status(400).json({ error: "Recherche invalide." });
  const where = {};
  if (q?.trim()) where.name = { [Op.substring]: q.trim() };
  if (top === "true") where.top = true;
  const join = [
    {
      model: Specialty,
      ...(category ? { where: { categoryId: Number(category) } } : {}),
      include: [Category],
    },
  ];
  res.json(
    (await Artisan.findAll({
      attributes: publicAttributes,
      where,
      include: [...join, cityJoin],
      order: [["name", "ASC"]],
    })).map(serialize),
  );
});
router.get("/artisans/:id", async (req, res) => {
  if (!validId(req.params.id))
    return res.status(404).json({ error: "Artisan introuvable." });
  const artisan = await Artisan.findByPk(req.params.id, {
    attributes: publicAttributes,
    include,
  });
  if (!artisan) return res.status(404).json({ error: "Artisan introuvable." });
  res.json(serialize(artisan));
});
router.post("/artisans/:id/contact", async (req, res) => {
  if (!validId(req.params.id))
    return res.status(404).json({ error: "Artisan introuvable." });
  const errors = contactErrors(req.body);
  if (Object.keys(errors).length)
    return res
      .status(400)
      .json({ error: "Vérifiez les champs.", fields: errors });
  const artisan = await Artisan.findByPk(req.params.id);
  if (!artisan) return res.status(404).json({ error: "Artisan introuvable." });
  if (!mailer || !process.env.SMTP_FROM)
    return res
      .status(503)
      .json({ error: "L'envoi de messages est temporairement indisponible." });
  // Le destinataire est lu en base, il ne peut pas être choisi par le visiteur.
  await mailer.sendMail({
    from: process.env.SMTP_FROM,
    to: artisan.email,
    replyTo: req.body.email.trim(),
    subject: req.body.subject.trim(),
    text:
      "Nom : " +
      req.body.name.trim() +
      "\nE-mail : " +
      req.body.email.trim() +
      "\n\n" +
      req.body.message.trim(),
  });
  res.json({
    message: "Votre message a été envoyé. Une réponse sera apportée sous 48h.",
  });
});
router.use((req, res) =>
  res.status(404).json({ error: "Route introuvable." }),
);
