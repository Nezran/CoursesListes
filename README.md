# Projet API 

* Par Mickaël Lacombe
* [cpnv.ch](www.cpnv.ch)

Création d'une application web pour rechercher des produits alimentaire sur l'API Open Food Facts.
Finalisation de la liste de courses et envoi via sms ou sur wunderlist

Créé avec React [![Build Status](https://travis-ci.org/facebookincubator/create-react-app.svg?branch=master)](https://travis-ci.org/facebookincubator/create-react-app)


# Installation

**Requis : ** Node js et npm installé

```
git clone https://github.com/Nezran/CoursesListes
```

## Installer les dépendances

```
npm install
``` 

## Créer une application sur wunderlist

Il faut utiliser une clé API pour générer la liste. 

via le lien [developer wunderlist](https://developer.wunderlist.com)

Créer une app

Dans App url indiquer : localhost

et Auth callback url : localhost:3000

Ensuite insérer:

 - Client ID
 - Client Secret

Dans le fichier src/CourseList.js à la ligne 17 et 18 dans les 2 constantes API



## Démarrer le projet 

```
npm start
``` 

## Structure du projet

Le fichier src/Engine.js est le coeur de l'application. Il s'occupe de gérer toutes les données, de faire l'appel principal pour récupérer les produits et d'envoyer et recevoir les données aux composants enfants. Les autres appels aux composants non mentionné ci-dessous sont les composants de material-ui qui s'occupe de l'interface.

Il s'occupe aussi de render tous les composants importants
  - CourseList -> gère le panier et l'envoi aux API  Swisscom et Wunderlist
  - Search -> qui permet de rechercher les produits 
  - Country -> qui permet de sélectionner les pays (ou il y a plus de 400 produits)
  - Paging -> gère la pagination
  - RenderProducts -> gère l'affichage de produits

## Problème restant

Chaque produit contient un grand nombre de données reçu par l'API, il arrive que quand il n'y a pas de donnée l'application génère un bug. On le remarque quand le résultat de la recherche ou pagination ne change pas les produits affiché. Si cette erreur arrive il suffit simplement de cliquer sur le bouton 'Réinitialiser' (reset toute l'app)

L'API principale Open Food Facts est une API libre, certains produits peuvent être vide ou "loufoque"...

Je n'ai pas pris en compte les erreurs des API swisscom et wunderlist, comme un numéro de téléphone ou email érroné. 
## API utilisées

[Wunderlist](http://developer.wunderlist.com)

[Open Food Facts](http://world-fr.openfoodfacts.org/)

[SMS Swisscom](https://api-developer.swisscom.com/)

[Material-ui](https://github.com/callemall/material-ui)
