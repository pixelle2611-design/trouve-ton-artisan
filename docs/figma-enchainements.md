# Enchaînements Figma - 21 octobre 2026

Fichier modifié directement : https://www.figma.com/design/aLEK2PR87VNLpFY1KOIhYz

189 interactions ON_CLICK ont été ajoutées aux 27 écrans existants. Vérification structurelle : aucune destination invalide. Trois points de départ sont définis : desktop 53:129, tablet 53:825, mobile 53:1518.

## Essai dans Figma
1. Ouvrir le fichier, onglet Prototype, puis lancer Présenter.
2. Choisir le parcours desktop, tablet ou mobile.
3. Depuis l'accueil : Rechercher mène à la recherche Chocolaterie ; la carte Chocolaterie mène à sa fiche ; la flèche utilise le retour au précédent écran.
4. Découvrir les artisans ou Bâtiment mène à la liste Bâtiment.
5. Le logo et les liens Accueil ramènent à l'accueil. Les liens du pied de page ouvrent les quatre pages légales. Le bouton de la 404 ramène à l'accueil.

La recherche est une simulation avec un résultat prévu, sans saisie dynamique ni appel API. Les autres fiches et catégories n'existent pas dans les 27 maquettes : aucun faux lien vers une fiche différente n'a été ajouté. Le formulaire de la maquette n'envoie aucun email. La 404 est consultable depuis son cadre ; elle n'est pas présentée comme une destination normale depuis l'accueil.

Le menu burger est du projet dans le site. Le dessin des maquettes mobiles existantes est conservé ; aucune simulation d'ouverture du burger n'a été ajoutée dans Figma. Un essai manuel en mode Présenter reste conseillé ; la présente vérification porte sur les propriétés de prototype et leurs destinations, pas sur un clic manuel dans l'interface Figma.

Preuve : docs/validation/figma-enchainements.json. Les captures de docs/maquettes sont des images historiques, elles ne contiennent pas les interactions. Les interactions restent enregistrées dans le fichier Figma en ligne, qui ne peut pas être embarqué automatiquement en fichier .fig dans ce ZIP.
