# Sprint 1

## User stories impliquées


| Identifiant | Description | Priorité | Difficulté |
|-------------|-------------|----------|------------|
| 5 | En tant qu'**utilisateur**, je veux ajouter une musique (id) à une playlist. Nous aurons un bouton "Add" à côté d'une playlist permettant d'être redirigé vers une barre de recherche permettant de chercher et d'ajouter une musique à cette playlist.| HIGH | 3 |
| 6 | En tant qu'**utilisateur**, je veux supprimer une musique d'une playlist. Nous aurons un bouton "Supprimer" à côté d'une musique permettant de supprimer cette musique de la playlist.| HIGH | 1 |
| 7 | En tant qu'**utilisateur**, je veux modifier une playlist. Le bouton "Modify" à côté d'une playlist permettra de modifier le nom de la playlist ainsi que la description de la playlist.| HIGH | 1 |
| 9 | En tant qu'**utilisateur**, je veux créer une playlist sur l'application. Sur la page de l'application au dessus de la liste des playlists disponible sera situé un bouton nous redirigeant vers le formulaire de création d'une playlist. Ce formulaire comportera un champ pour le nom de la playlist, et la définition de celle-ci.| HIGH | 2 |
| 10 | En tant qu'**utilisateur**, je veux supprimer une playlist que j'ai créée afin de l'enlever de ma liste de playlists. Cette option se trouvera à côté de la playlist à supprimer par un bouton "Delete", qui une fois cliqué ouvrira une fenêtre pop-up de demande de confirmation avant de supprimer définitivement la playlist.| HIGH | 1 |

## Tasks

| Identifiant | Description | US | Dépendances | Coût |
|-------------|-------------|----|-------------|------|
| TA1 | Installer Sonar | Aucune | Aucune | 20.5jh |
| TA2 | Installer Heroku | Aucune | Aucune | 100.5jh |
| TA3 | Installer Travis | Aucune | Aucune | 1000.5jh |
| T0d | Définir la structure de la base de données | Aucune | Aucune | 0.5jh |
| T0r | Mettre en place la base de données | Aucune | T0d | 1jh |
| T0td | Design du test de la bonne implémentation de la base de données | Aucune | T0d | 0.5jh |
| T0tr | Réalisation du test de la bonne implémentation de la base de données | Aucune | T0td | 0.5jh |
| T5d | Design du formulaire d'ajout d'une musique à une playlist | 5 | Aucune | 0.5jh |
| T5r | Réalisation du formulaire d'ajout d'une musique à une playlist | 5 | T5d | 0.5jh |
| T5td | Design du test du formulaire d'ajout d'une musique à une playlist | 5 | T5d | 0.5jh |
| T5tr | Réalisation du test du formulaire d'ajout d'une musique à une playlist | 5 | T5td | 0.5jh |
| T6d | Design du composant tableau listant les musiques d'une playlist | 6 | Aucune | 0.5jh |
| T6r | Réalisation du composant tableau listant les musiques d'une playlist | 6 | T6d | 0.5jh |
| T6td | Design du test du composant tableau listant les musiques d'une playlist | 6 | T6d | 0.5jh |
| T6tr | Réalisation du test du composant tableau listant les musiques d'une playlist | 6 | T6td | 0.5jh |
| T7d | Design du composant description regroupant les informations d'une playlist | 7 | Aucune | 0.5jh |
| T7r | Réalisation du composant description regroupant les informations d'une playlist | 7 | T7d | 0.5jh |
| T7td | Design du test du composant description regroupant les informations d'une playlist | 7 | T7d | 0.5jh |
| T7tr | Réalisation du test du composant description regroupant les informations d'une playlist | 7 | T7td | 0.5jh |
| T8d | Design du composant boutons permettant des modifications sur une playlist | 7 | Aucune | 0.5jh |
| T8r | Réalisation du composant boutons permettant des modifications sur une playlist | 7 | T8d | 0.5jh |
| T8td | Design du test du composant boutons permettant des modifications sur une playlist | 7 | T8d | 0.5jh |
| T8tr | Réalisation du test du composant boutons permettant des modifications sur une playlist | 7 | T8td | 0.5jh |
| T9d | Design du composant de création/modification d'une playlist | 9 | Aucune | 0.5jh |
| T9r | Réalisation du composant de création/modification d'une playlist | 9 | T9d | 0.5jh |
| T9td | Design du test du composant de création/modification d'une playlist | 9 | T9d | 0.5jh |
| T9tr | Réalisation du test du composant de création/modification d'une playlist | 9 | T9td | 0.5jh |
| T10d | Design du composant header | Aucune | Aucune | 0.5jh |
| T10r | Réalisation du composant header | Aucune | T10d | 0.5jh |
| T10td | Design du test du composant header | Aucune | T10d | 0.5jh |
| T10tr | Réalisation du test du composant header | Aucune | T10td | 0.5jh |
| T11d | Design du composant footer | Aucune | Aucune | 0.5jh |
| T11r | Réalisation du composant footer | Aucune | T11d | 0.5jh |
| T11td | Design du test du composant footer | Aucune | T11d | 0.5jh |
| T11tr | Réalisation du test du composant footer | Aucune | T11td | 0.5jh |
| T12d | Design de l'API REST de gestion de playlist | Aucune | Aucune | 0.5jh |
| T12r | Réalisation de l'API REST de gestion de playlist | Aucune | T12d | beaucoupdejh |
| T12td | Design du test de l'API REST de gestion de playlist | Aucune | T12d | beaucoupdejh |
| T12tr | Réalisation du test de l'API REST de gestion de playlist | Aucune | T12td | beaucoupdejh |
