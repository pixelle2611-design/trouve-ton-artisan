-- Migration UNIQUE depuis le schéma initial avec artisans.city (sans réinitialiser les artisans).
-- Sauvegarder la base avant exécution ; les DDL MySQL impliquent des commits implicites.
-- Utiliser un compte administrateur et arrêter l'application pendant la migration.
USE trouve_ton_artisan;
CREATE TABLE cities (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL UNIQUE
);
INSERT INTO cities (name) SELECT DISTINCT city FROM artisans ORDER BY city;
ALTER TABLE artisans ADD COLUMN city_id INT NULL;
UPDATE artisans AS a JOIN cities AS c ON a.city = c.name SET a.city_id = c.id;
-- Vérifier ici : SELECT COUNT(*) FROM artisans WHERE city_id IS NULL; doit renvoyer 0.
ALTER TABLE artisans MODIFY city_id INT NOT NULL;
ALTER TABLE artisans ADD CONSTRAINT fk_artisan_city FOREIGN KEY (city_id) REFERENCES cities(id);
ALTER TABLE artisans DROP COLUMN city;
-- Contrôles : SELECT COUNT(*) FROM artisans; et SELECT COUNT(*) FROM cities;
