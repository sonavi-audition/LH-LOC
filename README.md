# LH LOC

Site web de LH LOC pour la location d'un camion equestre a Trets.

Site public : https://www.lhloc.fr

Depot GitHub : https://github.com/sonavi-audition/LH-LOC

## Structure du projet

- `index.html` : page d'accueil.
- `tarifs.html` : page des tarifs.
- `camion.html` : presentation du camion et des photos.
- `reservation.html` : page de reservation avec calendrier.
- `contact.html` : page de contact.
- `mentions-legales.html` : mentions legales.
- `cgv.html` : conditions generales de vente.
- `css/style.css` : styles du site.
- `js/main.js` : navigation mobile, header, lien actif.
- `js/reservation.js` : calendrier, estimation du prix, formulaire de reservation.
- `js/contact.js` : formulaire de contact.
- `api/disponibilites.js` : fonction Vercel qui recupere les disponibilites depuis Horsicar.
- `images/` : images du site.
- `vercel.json` : configuration de la fonction Vercel, du cron et des headers de securite.
- `sitemap.xml` : liste des pages a transmettre aux moteurs de recherche.
- `robots.txt` : consignes d'exploration pour les moteurs de recherche.
- `llms.txt` : fichier d'information lisible par les assistants IA.
- `ACTION-PLAN.md` : plan d'amelioration SEO et technique.
- `FULL-AUDIT-REPORT.md` : rapport d'audit existant.

## Fonctionnement general

Le site est principalement statique : les pages sont servies directement en HTML, CSS et JavaScript.

La seule partie serveur est l'API Vercel :

```text
/api/disponibilites
```

Cette API utilise Puppeteer pour ouvrir la page Horsicar du camion et recuperer les dates indisponibles. Le calendrier de reservation appelle ensuite cette API depuis `js/reservation.js`.

Vercel appelle aussi cette API automatiquement une fois par jour, a 6h UTC, via le cron defini dans `vercel.json`. Cela permet de rechauffer le cache des disponibilites.

## Formulaires

Les formulaires sont envoyes via Formspree.

- Contact : `https://formspree.io/f/mzdyglky`
- Reservation : `https://formspree.io/f/mnjlveaa`

En cas de probleme de reception des messages, verifier en priorite :

1. Le compte Formspree.
2. L'adresse email destinataire.
3. Les limites du plan Formspree.
4. Les spams ou emails de validation Formspree.

## Disponibilites Horsicar

La synchronisation des disponibilites depend de la page :

```text
https://www.horsicar.com/annonce/1681165302412x125229945974847820
```

Point important : cette partie est fragile par nature. Si Horsicar modifie son interface, les classes CSS, les couleurs ou la structure du calendrier, l'API peut ne plus detecter correctement les dates.

Symptomes possibles :

- Le calendrier n'affiche plus les dates indisponibles.
- La page reservation fonctionne, mais toutes les dates semblent disponibles.
- L'API `/api/disponibilites` retourne une erreur.
- Vercel affiche une erreur dans les logs de la fonction.

## Installation locale

Depuis le dossier du projet :

```bash
npm install
```

Sur Windows PowerShell, si `npm install` est bloque par la politique d'execution, utiliser :

```bash
npm.cmd install
```

## Verification rapide

Verifier la syntaxe des fichiers JavaScript :

```bash
node --check api/disponibilites.js
node --check js/main.js
node --check js/reservation.js
node --check js/contact.js
```

Verifier l'etat Git :

```bash
git status
```

## Deploiement

Le site est deploye avec Vercel depuis GitHub.

La branche de production Vercel est :

```text
main
```

Routine normale :

1. Modifier les fichiers localement.
2. Verifier le site et les fichiers JavaScript.
3. Creer un commit Git.
4. Pousser vers GitHub.
5. Laisser Vercel redeployer automatiquement.
6. Verifier le site public apres deploiement.

Commandes habituelles :

```bash
git status
git add .
git commit -m "Description courte du changement"
git push origin main
```

Avant de pousser, verifier que la branche locale active est bien `main`.

## Points de vigilance

- Ne pas modifier les identifiants Formspree sans verifier le compte associe.
- Ne pas changer l'URL Horsicar sans tester `/api/disponibilites`.
- Apres toute modification de tarifs, mettre a jour toutes les pages concernees, pas seulement la page tarifs.
- Apres tout changement SEO, verifier `sitemap.xml`, les balises `canonical` et les titres des pages.
- Les images existent souvent en `.jpg` et `.webp`; garder les deux formats si une image est remplacee.

## Gestion conseillee

Pour chaque modification du site, noter :

- la demande initiale ;
- les fichiers modifies ;
- les tests effectues ;
- la date de mise en ligne ;
- le resultat observe sur le site public.

Cette discipline simple permet de revenir facilement en arriere si un changement pose probleme.
