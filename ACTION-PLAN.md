# Plan d'action SEO — lhloc.fr

Priorisation par impact/effort. Durées indicatives.

---

## 🔴 Critique — à faire cette semaine (4h)

### 1. Google Business Profile (1h) — **impact le plus fort**

1. Aller sur https://business.google.com/
2. Créer un profil "LH LOC"
3. Catégorie principale : **Service de location de véhicules utilitaires** (ou "Équipement équestre")
4. Adresse : 1340 Chemin de Bonnafoux, 13530 Trets
5. Zone de service : rayon 100 km autour de Trets (PACA)
6. Téléphone : 07 45 28 86 78
7. Site web : https://lhloc.fr
8. Horaires : 08h-19h 7j/7
9. Ajouter 5-10 photos (celles du site)
10. Demander la vérification (carte postale ou téléphone)

### 2. Soumettre le sitemap (30min)

- [Google Search Console](https://search.google.com/search-console)
  - Ajouter la propriété `https://lhloc.fr`
  - Vérifier via balise HTML (à ajouter dans `<head>` de index.html)
  - Soumettre `sitemap.xml`
- [Bing Webmaster Tools](https://www.bing.com/webmasters) — même procédure

### 3. Pages Mentions légales + CGV (2h)

Créer deux nouvelles pages HTML :
- `mentions-legales.html` : éditeur, hébergeur (Vercel), responsable publication, RGPD
- `cgv.html` : conditions générales de location (caution, franchise, annulation, etc.)

Remplacer les `href="#"` dans le footer par les vrais liens.

### 4. Ajouter `AggregateRating` au schema LocalBusiness (30min)

Dans `index.html`, ajouter dans le schema :

```json
"aggregateRating": {
  "@type": "AggregateRating",
  "ratingValue": "4.9",
  "reviewCount": "9",
  "bestRating": "5"
}
```

---

## 🟠 High — à faire dans les 2 semaines (6h)

### 5. Section FAQ + schema FAQPage (2h)

Ajouter sur la homepage (ou tarifs) une section FAQ avec 6-8 questions :

- Quel permis pour conduire le camion équestre STX AKX ?
- Quel est le tarif d'une journée de location en week-end ?
- Combien de kilomètres sont inclus par jour ?
- Puis-je transporter 2 chevaux en même temps ?
- Le véhicule est-il assuré ?
- Quelle caution est demandée ?
- Peut-on annuler sa réservation ?
- Où récupérer le véhicule ?

→ Encapsuler chaque Q/R dans un schema `FAQPage`.

### 6. Section "Avis clients" (1h)

Extraire 3-5 avis verbatim d'Horsicar avec autorisation. Les afficher sur la homepage avec photo/prénom/date.

Exemple :
```html
<section class="reviews">
  <h2>Ce que disent nos clients</h2>
  <div class="review">
    <div class="stars">★★★★★</div>
    <p>"Camion impeccable, propriétaire à l'écoute..."</p>
    <cite>— Sophie L., concours CSO à Avignon</cite>
  </div>
</section>
```

### 7. Créer `/llms.txt` (30min)

À la racine du site :

```
# LH LOC — Location camion équestre

> Location de camion équestre STX AKX 2 places à Trets (13), Bouches-du-Rhône. Tarifs : 130€/jour en semaine, 135€/jour week-end. Assurance tous risques + 200 km/jour inclus.

## Pages principales

- [Accueil](https://lhloc.fr/): présentation du service
- [Le Camion](https://lhloc.fr/camion.html): fiche technique STX AKX 2024
- [Tarifs](https://lhloc.fr/tarifs.html): grille tarifaire complète
- [Réservation](https://lhloc.fr/reservation.html): calendrier de disponibilités
- [Contact](https://lhloc.fr/contact.html): coordonnées et plan d'accès

## Contact

- Téléphone : 07 45 28 86 78
- Adresse : 1340 Chemin de Bonnafoux, Écuries de la Finca, 13530 Trets
- Horaires : 08h-19h, 7j/7
- Zone : PACA (rayon 100 km autour de Trets)
```

### 8. Maillage interne contextuel (1h)

Ajouter dans le contenu de chaque page des liens vers les autres pages :

- **/camion.html** : ajouter "[Consultez nos tarifs](tarifs.html)" après la fiche technique
- **/tarifs.html** : ajouter "[Découvrez le camion en détail](camion.html)" avant les tarifs
- **/reservation.html** : ajouter "[Voir la fiche technique](camion.html)" et "[Consulter les tarifs](tarifs.html)" en sidebar
- **/contact.html** : ajouter "[Réservez directement en ligne](reservation.html)"

### 9. Schema `Service` + `ReserveAction` sur /reservation.html (30min)

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Location de camion équestre",
  "provider": { "@type": "LocalBusiness", "name": "LH LOC" },
  "areaServed": "PACA",
  "potentialAction": {
    "@type": "ReserveAction",
    "target": "https://lhloc.fr/reservation.html"
  }
}
```

### 10. `BreadcrumbList` + breadcrumbs visuels (1h30)

Ajouter en CSS + HTML un fil d'Ariane simple sur les pages internes :
`Accueil > Le Camion` / `Accueil > Tarifs` / etc.

Schema correspondant :
```json
{
  "@type": "BreadcrumbList",
  "itemListElement": [
    {"@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://lhloc.fr/"},
    {"@type": "ListItem", "position": 2, "name": "Le Camion", "item": "https://lhloc.fr/camion.html"}
  ]
}
```

---

## 🟡 Medium — à faire dans le mois (4h)

### 11. Remplacer `Product` par `VehicleRental` sur /camion.html (30min)

```json
{
  "@type": "Product",
  "subjectOf": {
    "@type": "Vehicle",
    "vehicleModelDate": "2024",
    "brand": "STX",
    "model": "AKX Master Horsebox",
    "vehicleSeatingCapacity": 3,
    "numberOfAxles": 2,
    "fuelType": "Diesel",
    "vehicleConfiguration": "Camion équestre 2 chevaux"
  }
}
```

### 12. Preload + fetchpriority sur hero (30min)

Dans `<head>` de index.html :
```html
<link rel="preload" as="image" href="images/exterieur-arriere.webp" type="image/webp" fetchpriority="high">
```

Sur l'image hero :
```html
<img src="..." fetchpriority="high" loading="eager" decoding="async">
```

### 13. Compresser WebP plus agressivement (30min)

```bash
cd images
npx sharp-cli -i cheval-camion.jpg -o cheval-camion.webp --format webp --quality 70
# (passer de qualité 80 à 70 ou 75)
```

Cible : < 150 KB par image hero.

### 14. Headers de sécurité Vercel (1h)

Ajouter dans `vercel.json` :

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "SAMEORIGIN" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        { "key": "Permissions-Policy", "value": "camera=(), microphone=(), geolocation=()" }
      ]
    }
  ]
}
```

### 15. Favicon multi-formats + apple-touch-icon (30min)

Créer `favicon.ico` (16x16, 32x32) + `apple-touch-icon.png` (180x180).

---

## 🟢 Low — backlog / long-terme

### 16. Pages ville secondaires (4-6h)

- `/location-camion-equestre-aix-en-provence.html`
- `/location-camion-equestre-marseille.html`
- `/location-camion-equestre-salon-de-provence.html`

Chaque page doit avoir **contenu original** (~500 mots) : distance depuis Trets, haras/centres équestres locaux, concours à proximité. **Ne pas dupliquer** sinon Google les considère comme doorway pages.

### 17. Blog / articles long-form (10h+)

Sujets potentiels haute intention :
- "Quel permis pour conduire un camion équestre en France ?"
- "Comment préparer son cheval à un premier transport ?"
- "Van ou camion pour transporter un cheval : lequel choisir ?"
- "Les 5 erreurs à éviter lors du transport d'un cheval"
- "Checklist complète avant de prendre la route avec son cheval"

→ Boost énorme pour trafic organique informationnel + citations AI.

### 18. Citations locales (3h)

Inscriptions :
- Pages Jaunes (gratuit)
- Mappy / Bing Places
- Equirodi
- 1er Cheval
- Annuaire FFE (si affilié)
- Facebook Business Page

### 19. Linkbuilding local

- Partenariats avec écuries/haras locaux (échange de liens)
- Articles invités sur blogs équestres
- Sponsor de concours CSO/CCE locaux (mention sur site de l'épreuve)

---

## Récapitulatif effort total

| Priorité | Total |
|---|---|
| 🔴 Critique | **4h** |
| 🟠 High | **6h** |
| 🟡 Medium | **4h** |
| 🟢 Low | **20h+** |
| **Total (hors Low)** | **~14h** |

## Calendrier suggéré

- **Semaine 1** : items 1-4 (critiques)
- **Semaine 2** : items 5-7 (FAQ, avis, llms.txt)
- **Semaine 3** : items 8-10 (maillage, schemas supplémentaires)
- **Mois 2** : items 11-15 (medium)
- **Mois 3+** : items 16-19 (pages ville, blog, citations)

---

## KPI à suivre (mensuels)

1. **Positions Google** sur "location camion équestre [ville]"
2. **Impressions GSC** (objectif : 2x en 3 mois)
3. **Clics GSC** (objectif : 50 clics/mois à 3 mois)
4. **Trafic organique GA4** (à configurer)
5. **Demandes de réservation** (via Formspree)
6. **Appels téléphoniques** (tracking `tel:` clicks)
7. **Avis Google** (cible : 5+ avis à 3 mois)
