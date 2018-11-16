# Playlist Generator

[![Build Status](https://travis-ci.org/LucasVivas/Playlist-Generator.svg?branch=master)](https://travis-ci.org/LucasVivas/Playlist-Generator)

Site web de génération de playlist.

### Définitions

**Visiteur** représente une personne accédant au site internet sans avoir créé
de compte au préalable.

**Utilisateur** représente une personne qui utilise l'application. Tout
utilisateur peut soumettre une playlist accessible par les autres utilisateurs.

**Playlist** Séquence de musiques regroupées par logique ou thème.

**Mix** Playlist ayant ses musiques jouées selon un ordre défini.

### Liste des user stories

| Identifiant | Description | Priorité | Difficulté |
|-------------|-------------|----------|------------|
| 1 | En tant que **visiteur**, je veux créer un compte sur l'application en paramétrant mes identifiants de connexion tels que mon nom d'utilisateur et mon mot de passe, ou bien en utilisant mes identifiants de connexion Facebook afin de me connecter. Un lien redirigeant vers la création d'un compte utilisateur sera présent dès la page d'accueil de l'application. Les identifiants (*Nom d'utilisateur*, *Mot de passe* et *Adresse mail*) seront à saisir dans un formulaire, ou bien il suffira de cliquer sur un bouton "Sign up with Facebook" sur ladite page pour créer un compte.| MEDIUM | 2 |
| 2 | En tant qu'**utilisateur**, je veux me connecter à l'application à l'aide de mes identifiants de connexion afin de créer ou d'écouter une playlist de mon choix.| MEDIUM | 2 |
| 3 | En tant qu'**utilisateur**, je veux me déconnecter de l'application à tout moment afin de fermer ma session en appuyant sur le bouton "Déconnexion" situé en haut à droite de la page, et une fois déconnecté je suis redirige vers la page de connexion.| MEDIUM | 1 |
| 4 | En tant qu'**utilisateur**, une fois connecté, je veux consulter la liste des playlists disponibles sur le site afin de choisir mon programme musical du moment. Chaque playlist sera listé dans l'ordre de leur création, en comptant les playlists générées de base par l'application regroupant quelques styles musicaux précis, et sera affichées selon la forme (*Nom de la playlist*, *Description de la playlist*, *Date de création de la playlist*).| HIGH | 3 |
| 5 | En tant qu'**utilisateur**, je veux créer une playlist sur l'application afin de l'écouter. Sur la page de l'application au dessus de la liste des playlists disponible sera situé un bouton nous redirigeant vers le formulaire de création d'une playlist. Ce formulaire comportera un champ pour le nom de la playlist, et la définition de celle-ci.| HIGH | 2 |
| 6 | En tant qu'**utilisateur**, je veux modifier la description d'une playlist existante afin de le mettre à jour ou de clarifier sa visée. Cette option sera disponible en cliquant sur un boutant "Modify" situé à côté de la playlist que l'on veut modifier.| HIGH | 1 |
| 7 | En tant qu'**utilisateur**, je veux supprimer une playlist que j'ai créée afin de l'enlever de ma liste de playlists. Cette option se trouvera à côté de la playlist à supprimer par un bouton "Delete", qui une fois cliqué ouvrira une fenêtre pop-up de demande de confirmation avant de supprimer définitivement la playlist.| HIGH | 1 |
| 11 | En tant qu'**utilisateur**, je veux ajouter une musique à une playlist afin d'enrichir cette dernière. Nous aurons un bouton "Add" à côté d'une playlist permettant d'être redirigé vers une barre de recherche permettant de chercher et d'ajouter une musique à cette playlist.| HIGH | 3 |
| 12 | En tant qu'**utilisateur**, je veux supprimer une musique d'une playlist. Le bouton "Modify" à côté d'une playlist permettra, en plus de modifier le nom de la playlist, de sélectionner une ou plusieurs musiques puis de les supprimer de la playlist en créer sur la bouton "Delete" en bas du formulaire de modification de playlist.| HIGH | 3 |
| 14 | En tant qu'**utilisateur**, je souhaite générer une playlist selon une description définie par des tags afin de me dispenser du travail de création de playlist et de découvrir également de nouvelles musiques. Sur la page de l'application au dessus des playlists et à côté du bouton de création de playlist manuellement sera disponible un bouton permettant de créer une playlist automatiquement. Ce bouton nous redirige vers un formulaire de création de playlist en nous proposant de rentrer des tags en guise de description de la playlist à générer. Une fois les tags rentrés, le playlist devra être générée en cliquant sur un bouton "Create" situé en bas du formulaire, lançant ainsi l'algorithme de génération de playlist.| LOW | 5 |

### Planification

Difficulté totale : 23

#### Répartition des issues

| Sprint ID | User stories à réaliser | Difficulté du sprint |
|-----------|-------------------------|----------------------|
| 1 | | |
| 2 | | |
| 3 | | |
| 4 | | |
| 5 | | |
