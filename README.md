# Trouve ton artisan

Dossier de projet - pixelle2611

Annuaire des artisans de la région Auvergne-Rhône-Alpes.

## Installation

Prérequis : Node.js >= 22.12, npm, MySQL 8 ou MariaDB 10.6 et un compte SMTP pour les messages.

1. Dans trouve-ton-artisan, exécuter npm ci.
2. Sur une base de test, importer database/create.sql puis database/seed.sql. ATTENTION : create.sql supprime et recrée la base dédiée trouve_ton_artisan. Sauvegarder avant exécution.
3. Pour une ancienne base avec artisans.city, utiliser une seule fois database/migrate-city.sql après sauvegarde et test sur une copie. Les DDL impliquent des commits implicites.
4. Créer un compte SQL dédié avec SELECT ; copier .env.example vers .env et renseigner les accès.
5. Lancer npm test puis npm run build.
6. En développement : npm start et npm run dev dans deux terminaux, puis http://localhost:5173. APP_ORIGIN doit correspondre à cette origine.
7. En production : NODE_ENV=production, APP_ORIGIN sur le domaine HTTPS, TRUST_PROXY adapté à l'hébergement ; npm start sert dist et l'API.

## Organisation

- src/main.jsx : montage React ; src/App.jsx : routes et gabarit.
- src/pages, src/components, src/services : pages, composants et chargement.
- server/index.js : démarrage ; server/routes, server/services, server/middleware : API, SMTP et protections.
- server/models.js : modèles et associations ; server/validation.js : validation.
- database : schéma, alimentation et migration.
- docs : modélisation, prototype, maquettes et résultats de vérification.

## Validation

15 tests Node réussis ; build Vite réussi avec avertissements Sass/Bootstrap et React Router ; npm audit sans vulnérabilité connue au contrôle du 21 octobre 2026. Les tests HTTP simulent SQL et désactivent SMTP ; les captures navigateur utilisent une API simulée. Le contrôle de cohérence SQLite adapté ne remplace pas un import MySQL/MariaDB. Voir le dossier PDF pour le périmètre complet.

## SMTP et publication

Configurer SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASSWORD et SMTP_FROM. Vérifier un envoi uniquement vers une boîte autorisée. Aucun message de test ne doit être envoyé aux artisans. Ne jamais publier .env. Graphik Trial est fourni pour usage personnel selon sa notice ; obtenir une licence web avant publication de ces fichiers.

## Maquettes

Fichier de référence :https://www.figma.com/design/iHlV45tEcg547AfAIDVwP5/Trouve-ton-artisan
Trois points de départ et 189 interactions pour les écrans existants ; consulter docs/figma-enchainements.md.

## Dépôt du projet

https://github.com/pixelle2611-design/trouve-ton-artisan

## Données de démonstration

Le script public database/seed.sql utilise 17 noms et adresses de démonstration sur example.com ; les sites web sont laissés vides. Les villes, catégories, spécialités et relations sont conservées. Ces coordonnées ne permettent pas de contacter les artisans du jeu pédagogique initial. Pour l’évaluation avec les données fournies par la formation, utiliser le script du livrable local uniquement dans un environnement autorisé.
