# Modélisation du projet - 21 octobre 2026

## MCD
Les identifiants sont en **gras et soulignés**. Une association exprime le lien ; aucune clé étrangère n'est placée dans le MCD.

- CATÉGORIE : <b><u>id</u></b>, **nom**.
- SPÉCIALITÉ : <b><u>id</u></b>, **nom**.
- VILLE : <b><u>id</u></b>, **nom**.
- ARTISAN : <b><u>id</u></b>, nom, note, présentation, email, site, sélection, image.

CATÉGORIE (0,N) - REGROUPER - (1,1) SPÉCIALITÉ.
SPÉCIALITÉ (0,N) - EXERCER - (1,1) ARTISAN.
VILLE (0,N) - LOCALISER - (1,1) ARTISAN.

## MLD
Convention du correcteur : clé primaire **grasse et soulignée**, clé étrangère précédée de #, colonne UNIQUE **grasse**.

- categories (<b><u>id</u></b> INT, **name** VARCHAR(60)).
- specialties (<b><u>id</u></b> INT, **name** VARCHAR(80), #category_id INT).
- cities (<b><u>id</u></b> INT, **name** VARCHAR(100)).
- artisans (<b><u>id</u></b> INT, name VARCHAR(120), rating DECIMAL(2,1), #city_id INT, about TEXT, email VARCHAR(254), website VARCHAR(255), top BOOLEAN, image VARCHAR(255), #specialty_id INT).

#category_id référence categories.id ; #specialty_id référence specialties.id ; #city_id référence cities.id. Le # est une convention documentaire et ne fait pas partie du nom SQL.

Tous les attributs sont NOT NULL sauf website. Les identifiants sont AUTO_INCREMENT. top vaut FALSE et image vaut /artisan.svg par défaut. La note est contrainte à [0,5]. Les noms des catégories, spécialités et villes sont uniques. Les FK empêchent les références inexistantes.

Le jeu fourni contient 4 catégories, 15 spécialités, 14 villes et 17 artisans. Chaque artisan porte un city_id ; la réponse publique conserve city sous forme de texte grâce à la jointure Sequelize. La ville n'est plus répétée dans la table artisans.

Les dépendances retenues respectent les trois premières formes normales pour ce périmètre : attributs atomiques, clés simples, localité indépendante et catégorie déterminée par la spécialité. Le nom de ville est supposé unique dans le jeu régional fourni. Pour un annuaire étendu acceptant des communes homonymes, ajouter un code INSEE et revoir cette unicité.

## Installation et migration
create.sql réinitialise volontairement la base dédiée : DROP DATABASE IF EXISTS. Il détruit son contenu. Réserver son exécution à une nouvelle installation ou à une réinitialisation après sauvegarde.

Une base existante doit utiliser database/migrate-city.sql une seule fois, après sauvegarde et arrêt de l'application. Cette migration conserve les artisans ; les DDL MySQL ne sont pas entièrement transactionnelles. Elle n'a pas été exécutée sur un serveur MySQL dans cette session.
