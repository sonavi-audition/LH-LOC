# Contexte Codex - LH LOC

Ce fichier sert a reprendre le contexte de travail Codex depuis n'importe quel poste.

Quand un nouveau clavardage Codex est ouvert dans ce projet, commencer par demander :

```text
Lis README.md et CODEX-HANDOFF.md, puis reprends la gestion du site LH LOC.
```

## Projet

- Site public : https://www.lhloc.fr
- Depot GitHub : https://github.com/sonavi-audition/LH-LOC
- Branche de production Vercel : `main`
- Email Git utilise pour les commits : `contact@sonavi-audition.fr`
- Nom Git utilise pour les commits : `Fabien Haddad`

## Objectif

Reprendre la gestion du site LH LOC proprement avec Codex, GitHub et Vercel.

Le site doit etre maintenu via GitHub. Vercel redeploie automatiquement quand des changements sont pousses sur `main`.

## Etat actuel

Le projet a ete clone localement et inspecte.

Le site est principalement statique :

- pages HTML ;
- styles CSS ;
- scripts JavaScript ;
- une fonction API Vercel pour les disponibilites.

Un fichier `README.md` de maintenance a ete cree et pousse sur `main`.

Une section expliquant le travail sur deux postes a aussi ete ajoutee au README.

## Fichiers importants

- `README.md` : documentation de maintenance du projet.
- `index.html` : accueil.
- `tarifs.html` : tarifs.
- `camion.html` : presentation du camion.
- `reservation.html` : reservation et calendrier.
- `contact.html` : contact.
- `mentions-legales.html` : mentions legales.
- `cgv.html` : conditions generales de vente.
- `css/style.css` : styles.
- `js/main.js` : navigation et comportements communs.
- `js/reservation.js` : calendrier, prix, formulaire de reservation.
- `js/contact.js` : formulaire de contact.
- `api/disponibilites.js` : recuperation des disponibilites depuis Horsicar.
- `vercel.json` : configuration Vercel, cron et headers.

## Points sensibles

### Vercel

Vercel deploie depuis la branche `main`.

Avant tout push, verifier :

```bash
git switch main
git status
```

### GitHub

GitHub est le point central de synchronisation entre les postes.

Routine avant de travailler :

```bash
git switch main
git pull origin main
git status
```

Routine apres modification :

```bash
git status
git add .
git commit -m "Description courte du changement"
git push origin main
```

### Formspree

Les formulaires passent par Formspree.

- Contact : `https://formspree.io/f/mzdyglky`
- Reservation : `https://formspree.io/f/mnjlveaa`

En cas de probleme, verifier le compte Formspree, les destinataires et les spams.

### Horsicar

Les disponibilites sont recuperees depuis :

```text
https://www.horsicar.com/annonce/1681165302412x125229945974847820
```

Cette partie est fragile : si Horsicar change son interface, `api/disponibilites.js` peut devoir etre adapte.

## Travail deja effectue avec Codex

1. Depot GitHub identifie : `sonavi-audition/LH-LOC`.
2. Projet clone localement.
3. Branche de production Vercel confirmee : `main`.
4. Difference identifiee entre `master` et `main`; le travail a ete bascule sur `main`.
5. Dependances npm installees.
6. Verification syntaxique des fichiers JavaScript effectuee avec `node --check`.
7. Identite Git locale configuree :
   - `Fabien Haddad`
   - `contact@sonavi-audition.fr`
8. `README.md` cree et pousse.
9. Section "Travailler sur deux postes" ajoutee au README et poussee.

## Commits Codex deja pousses

- `2aa5fd5 Add maintenance README`
- `ff4f2bf Document two-computer workflow`

## Comment reprendre depuis un autre poste

Sur le poste :

```bash
git clone https://github.com/sonavi-audition/LH-LOC.git
cd LH-LOC
git switch main
git config --local user.name "Fabien Haddad"
git config --local user.email "contact@sonavi-audition.fr"
npm.cmd install
```

Dans Codex, ouvrir le dossier `LH-LOC`, puis ecrire :

```text
Lis README.md et CODEX-HANDOFF.md, puis reprends la gestion du site LH LOC.
```

## Note sur les clavardages Codex

Les clavardages Codex ne sont pas forcement synchronises automatiquement entre plusieurs ordinateurs.

La methode fiable consiste a garder le contexte important dans le depot GitHub avec :

- `README.md` pour la documentation durable ;
- `CODEX-HANDOFF.md` pour le contexte de reprise Codex.

Ainsi, meme si le clavardage original n'apparait pas sur un autre poste, Codex peut reprendre le travail en lisant ces fichiers.
