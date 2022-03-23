# FISHEYE
***
## Un site accessible pour une plateforme de photographes
FishEye est un site web qui permet aux photographes indépendants de présenter leurs meilleurs travaux.

***
### Lien du site
https://ainaLagrande.github.io/FishEye/
***
### Maquettes du site 
https://www.figma.com/file/Q3yNeD7WTK9QHDldg9vaRl/UI-Design-FishEye-FR?node-id=0%3A1

### Objectif :
Le site est obsolète et a besoin d'être remanié.<br>
" Nous  aimerions que votre équipe le transforme d'un site statique à un site dynamique".
***
### Prototype des fonctionnalités :
les pages :
####  Page d'accueil :
○ Liste de tous les photographes avec leur nom, leur slogan, leur
localisation, leur prix/heure et une image miniature de leur choix.<br>
○ Lorsque l'utilisateur clique sur la vignette d'un photographe, il est
amené à sa page.
***
#### Page des photographes 
(le contenu de la page sera généré de manière dynamique en fonction du photographe) :
○ Affiche une galerie des travaux du photographe.<br>
○ Les photographes peuvent montrer à la fois des photos et des vidéos.<br>
○ Chaque média comprend un titre et un nombre de likes.<br>
■ Lorsque l'utilisateur clique sur l'icône "Like", le nombre de likes<br>
affiché est incrémenté.<br>
■ Le nombre de likes total d’un photographe doit correspondre à la
somme des likes de chacun de ses médias.<br>
○ Les médias peuvent être triés par popularité ou par titre.<br>
○ Lorsque l'utilisateur clique sur un média, celui-ci  s’ouvre dans une
lightbox :<br>
■ Lorsque la lightbox est affichée, il y a une croix dans le coin pour
fermer la fenêtre.<br>
■ Des boutons de navigation permettent de passer d'un élément
média à l'autre (les utilisateurs peuvent cliquer sur ces boutons
pour naviguer).<br>
■ Les touches fléchées permettent également de naviguer entre
les médias.<br>
○ Un bouton pour contacter le photographe.
■ Le formulaire de contact est une modale qui s'affiche par-dessus
le reste.<br>
■ Il comprend des champs pour les noms, l'adresse électronique et
le message.<br>
■ Plus tard, le bouton de contact enverra un message au
photographe. Pour l'instant,ca affiche seulement le contenu des
trois champs dans les logs de la console.<br>
***
### L'accessibilité est clé !
"Il est très important que notre site soit accessible aux utilisateurs malvoyants.<br>
Toutes nos photos doivent comporter des descriptions textuelles, et vous devez les
inclure dans la page. De plus, l'utilisateur doit pouvoir utiliser les commandes du
clavier pour naviguer sur le site, comme les touches fléchées de la lightbox".<br>
● Utilisation des éléments HTML "sémantiques" qui décrivent leur intention autant
que possible, au lieu de mettre des éléments <div> et <span> partout.<br>
● Lorsque  un élément personnalisé est crée, il y a des attributs ARIA
pour décrire ce qu'il fait.<br>
● Les images présentent un attribut “alt”. Avec le titre des photos pour
remplir cet attribut, et le nom du photographe dans le cas d’une photo de
profil de photographe.<br>
● Le code passe les tests AChecker sans “known issue” (il est
conforme aux WCAG).<br>
● Toute la gestion des événements (par exemple, les clics et les pressions au
clavier) est configurée (utilisez KeyboardEvent.key ou
KeyboardEvent.code.).<br>
***
### Contraintes techniques additionnelles
● Le code est séparé en différents fichiers (HTML, CSS, JavaScript).<br>
● ESLint est utilisé (avec les paramètres par défaut) pour garantir que le
code est robuste. Ceci est particulièrement facile à intégrer avec l'IDE
VSCode.<br>
● Une version moderne (ES6 ou supérieure) de JavaScript est utilisée et
les fonctionnalités obsolètes ne sont pas utilisées.<br>
Le code est lisible.Les variables et fonctions ont
un nom qui ont un sens, et le code est commenté<br>
