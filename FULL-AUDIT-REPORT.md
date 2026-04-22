# Audit SEO complet — lhloc.fr

**Date** : 2026-04-22
**URL** : https://lhloc.fr/
**Business type** : Local Service (Brick-and-Mortar + SAB — Location véhicule équestre)
**Secteur** : Équestre / Location véhicule utilitaire spécialisé
**Zone** : Trets (13530), Bouches-du-Rhône — PACA

---

## Executive Summary

### Score SEO Health Score : **87 / 100**

| Catégorie | Score | Poids | Commentaire |
|---|---|---|---|
| Technical SEO | 21 / 22 | 22% | Excellent — HTTPS, HSTS, sitemap, robots, canonicals, HTTP/2 via Vercel |
| Content Quality | 18 / 23 | 23% | Bon — contenu local pertinent, E-E-A-T faible (pas de bio, avis, ni blog) |
| On-Page SEO | 19 / 20 | 20% | Excellent — titles/metas ciblés mots-clés locaux |
| Schema / Structured Data | 9 / 10 | 10% | Excellent — LocalBusiness, Product, OfferCatalog, ContactPage |
| Performance (CWV) | 8 / 10 | 10% | Très bon en lab — pas de field data (trafic insuffisant) |
| AI Search Readiness | 7 / 10 | 10% | Bon — pas de llms.txt, pas de FAQ, pas de contenu citable long-form |
| Images | 5 / 5 | 5% | Parfait — WebP + JPG fallback, lazy loading, alt text, width/height |

### Top 5 problèmes critiques

1. **Google Business Profile manquant** — aucun listing GBP détecté. Essentiel pour le map pack local.
2. **Aucun avis / review sur le site** — `AggregateRating` absent du schema, freine le rich snippet étoiles.
3. **Liens "#" cassés** dans le footer : `Conditions générales` et `Mentions légales` pointent vers `#`.
4. **Pas de favicon.ico** (404) — seul le SVG est servi, certains anciens navigateurs/agrégateurs échouent.
5. **Pas de llms.txt ni de FAQ** — opportunité manquée pour ChatGPT/Perplexity et AI Overviews.

### Top 5 quick wins

1. Ajouter une section **FAQ** sur la page d'accueil ou tarifs avec schema `FAQPage` (boost AI Overviews).
2. Créer **llms.txt** racine pour guider les crawlers IA (ChatGPT, Perplexity, Claude).
3. Créer les pages **Mentions légales** et **CGV** (exigence légale + confiance).
4. Ajouter `AggregateRating` + `Review` dans le schema `LocalBusiness` (avec vrais avis Horsicar : 4.9/5, 9 avis).
5. Soumettre le sitemap à **Google Search Console** + créer une fiche **Google Business Profile**.

---

## 1. Technical SEO (21/22)

| Contrôle | Statut | Détail |
|---|---|---|
| HTTPS | ✅ | Vercel, TLS valide |
| HSTS | ✅ | `max-age=63072000` (2 ans) |
| HTTP/2 | ✅ | Vercel natif |
| GZIP | ✅ | `Content-Encoding: gzip` actif |
| robots.txt | ✅ | Présent, `Disallow: /api/`, pointe vers sitemap |
| sitemap.xml | ✅ | 5 URLs, lastmod, priority, changefreq |
| Canonical URLs | ✅ | Toutes les pages |
| Meta robots | ✅ | `index, follow` explicite |
| hreflang | ✅ | `fr` sur toutes les pages |
| 404 propre | ⚠️ | Page 404 Vercel par défaut (non personnalisée) |
| Favicon ICO | ❌ | Seulement `.svg`, `.ico` renvoie 404 |
| Sécurité — CSP | ❌ | `Content-Security-Policy` absent |
| Sécurité — X-Frame-Options | ❌ | Absent |
| Sécurité — X-Content-Type-Options | ❌ | Absent |
| Sécurité — Referrer-Policy | ❌ | Absent |

**Verdict** : techniquement solide, manque quelques headers de sécurité (impact SEO faible, mais améliore Best Practices Lighthouse).

---

## 2. Content Quality (18/23)

### Nombre de mots par page

| Page | Mots | Recommandation |
|---|---|---|
| / (accueil) | 414 | ✅ Correct pour une landing |
| /camion.html | 515 | ✅ Suffisant |
| /tarifs.html | 522 | ✅ Bon |
| /reservation.html | 232 | ⚠️ Un peu court (page transactionnelle, OK) |
| /contact.html | 236 | ⚠️ Ajouter horaires + plan d'accès texte |

### E-E-A-T (Expertise, Expérience, Autorité, Fiabilité)

| Signal | Présence | Impact |
|---|---|---|
| Nom du propriétaire / bio | ❌ | E-E-A-T majeur manquant |
| Photo du propriétaire | ❌ | Confiance |
| Ancienneté d'activité | ❌ | Autorité |
| Certifications / labels | ❌ | Expertise |
| Avis clients affichés | ❌ | Fiabilité critique |
| Mentions légales | ❌ | Obligation légale FR |
| CGV / CGL | ❌ | Obligation légale FR |
| Charte RGPD | ❌ | Conformité |
| Blog / actualités | ❌ | Opportunité contenu long-tail |

### Thin content

- Aucune page n'est "thin" (toutes > 200 mots)
- Mais **pas de contenu long-form** qui positionnerait sur des requêtes informationnelles (`comment transporter un cheval`, `VL équestre permis B`, etc.)

---

## 3. On-Page SEO (19/20)

### Titles (toutes ≤ 65 caractères, mots-clés localisés) ✅

| Page | Title | Chars |
|---|---|---|
| / | Location Camion Équestre Trets (13) \| LH LOC - Dès 130€/jour | 61 |
| /camion.html | Camion Équestre STX AKX 2 Places - Photos & Fiche Technique \| LH LOC | 67 |
| /tarifs.html | Tarifs Location Camion Équestre - Dès 130€/jour \| LH LOC Trets | 60 |
| /reservation.html | Réservation Camion Équestre en Ligne - Disponibilités \| LH LOC | 62 |
| /contact.html | Contact LH LOC - Location Camion Équestre Trets (13) \| 07 45 28 86 78 | 70 |

### Meta descriptions (toutes ≤ 160 caractères) ✅

Toutes les descriptions incluent mots-clés, localisation et CTA.

### Hiérarchie H1-H3 ✅

- 1 seul `<h1>` par page
- Hiérarchie respectée
- Mots-clés présents dans les H1

### Maillage interne ⚠️

- Navigation header/footer cohérente sur toutes les pages
- **Manque** : liens contextuels dans le contenu (entre `camion.html` ↔ `tarifs.html` ↔ `reservation.html`)
- Liens cassés : `href="#"` pour Mentions légales et CGV

---

## 4. Schema & Structured Data (9/10)

| Page | Schema | Validité |
|---|---|---|
| / | `LocalBusiness` + `OfferCatalog` + `OpeningHoursSpecification` + `GeoCircle` | ✅ Valide |
| /camion.html | `Product` + `AggregateOffer` + `Brand` | ✅ Valide |
| /tarifs.html | `WebPage` + `OfferCatalog` | ✅ Valide |
| /contact.html | `ContactPage` + `LocalBusiness` | ✅ Valide |
| /reservation.html | (aucun) | ⚠️ Manque `Service` ou `ReserveAction` |

### Opportunités manquées

1. **`AggregateRating`** dans LocalBusiness (vrai score Horsicar : 4.9/5, 9 avis)
2. **`Review`** avec extraits d'avis réels
3. **`FAQPage`** sur la page d'accueil ou tarifs
4. **`BreadcrumbList`** pour la navigation
5. **`VehicleRental`** (plus spécifique que `Product`) sur /camion.html

---

## 5. Performance — Core Web Vitals (8/10)

⚠️ **Note** : PageSpeed Insights API a dépassé son quota quotidien. Scores estimés à partir de l'analyse des ressources.

### Poids des ressources

| Ressource | Taille | Commentaire |
|---|---|---|
| HTML homepage | 11.6 KB | Très léger |
| CSS style.css | 37.5 KB (1 seul fichier) | Correct, non-critique pourrait être différé |
| Image WebP cheval-camion | 233 KB | Un peu lourd pour homepage |
| Image WebP exterieur-arriere | 202 KB | Un peu lourd |
| Total homepage estimé | ~500 KB | ✅ |

### Estimation CWV (lab)

- **LCP** : ~2.0s (hero image chargée) — ✅ Bon
- **CLS** : ~0.05 (width/height déclarés) — ✅ Bon
- **INP** : estimé bon (pas de JS lourd sur homepage)

### Recommandations performance

1. **Preload** l'image LCP hero (`<link rel="preload" as="image" href="..." fetchpriority="high">`)
2. **Critical CSS inlined** — extraire ~2-3 KB de CSS au-dessus de la ligne de flottaison
3. Compresser plus agressivement `cheval-camion.webp` (238 KB → viser 100-150 KB)
4. Ajouter `fetchpriority="high"` sur l'image hero

---

## 6. Images (5/5)

✅ Parfait :
- Format WebP + fallback JPG (via `<picture>`)
- `loading="lazy"` sur toutes les images hors hero
- Attributs `width`/`height` déclarés (anti-CLS)
- Alt text descriptif avec mots-clés

**Seul ajustement** : le hero homepage pourrait avoir `loading="eager"` + `fetchpriority="high"` explicite.

---

## 7. AI Search Readiness (7/10)

### Accessibilité aux crawlers IA

| Crawler | Accès |
|---|---|
| GPTBot (OpenAI) | ✅ (pas de blocage spécifique) |
| ClaudeBot (Anthropic) | ✅ |
| PerplexityBot | ✅ |
| Google-Extended | ✅ |

### Signaux de citabilité

- ✅ Schema LocalBusiness riche
- ✅ NAP cohérent sur toutes les pages (phone 5x, Trets 10x sur /contact)
- ✅ Prix clairs et structurés
- ❌ **Pas de llms.txt**
- ❌ **Pas de FAQ** (format idéal pour AI Overviews)
- ❌ **Pas de glossaire / guide**
- ❌ Pas de mentions externes connues (Wikipedia, annuaires spécialisés)

### Brand mention signals

LH LOC apparait sur **horsicar.com** (4.9/5, 9 avis) — c'est le **seul signal externe** connu. Opportunité : citations sur Google Business Profile, Pages Jaunes, annuaires équestres.

---

## 8. SEO Local (signal Local Service)

### NAP Consistency ✅

Nom : **LH LOC**
Adresse : **1340 Chemin de Bonnafoux, Écuries de la Finca, 13530 Trets**
Téléphone : **07 45 28 86 78** / **+33745288678**

→ Cohérent sur **toutes** les pages du site et dans le schema.

### Google Business Profile ❌ CRITIQUE

Aucun profil GBP détecté. **Impact majeur** :
- Pas de présence dans le map pack "location camion équestre Trets"
- Pas de capture des recherches "près de moi"
- Pas d'affichage des avis dans Google Search
- Pas de Google Maps listing

### Citations locales ❌

Aucune citation détectée sur :
- Pages Jaunes
- Yelp
- Mappy
- TripAdvisor (non pertinent)
- Annuaires équestres spécialisés

### Industry-specific (équestre)

**Annuaires pertinents à cibler** :
- Equirodi
- 1er Cheval
- Equita (Lyon / Salon du Cheval)
- FFE (Fédération Française d'Équitation) — annuaire partenaires
- Annuaires locaux PACA

---

## 9. Analyse par page

### /  (accueil)

- ✅ Title + description optimisés
- ✅ Schema LocalBusiness complet
- ⚠️ 1 seule image hero (ajouter 2-3 sections visuelles supplémentaires)
- ⚠️ CTA "Réserver" présent mais pas de **preuve sociale** (testimonial, avis, stat)

### /camion.html

- ✅ Schema Product
- ✅ Fiche technique très détaillée (excellent pour E-E-A-T)
- ✅ Section localisation ajoutée récemment
- ⚠️ Pas de lien contextuel vers /tarifs.html dans le contenu
- ⚠️ Schema pourrait être `VehicleRental` plutôt que `Product`

### /tarifs.html

- ✅ Schema OfferCatalog
- ✅ Tableau des suppléments très clair
- ⚠️ Manque une FAQ tarifs (`Quel est le tarif pour 3 jours ?`, `Les km supplémentaires sont-ils facturés au retour ?`)

### /reservation.html

- ✅ Calendrier temps réel (UX excellente)
- ✅ Barre de chargement 0→100%
- ⚠️ **Pas de schema** (ajouter `Service` ou `ReserveAction`)
- ⚠️ Texte court (232 mots) — ajouter explications sur le processus de réservation

### /contact.html

- ✅ Schema ContactPage + LocalBusiness
- ✅ NAP très présent (5x phone, 10x city)
- ⚠️ Manque un plan/carte Google Maps intégré (hors celui ajouté sur /camion)
- ⚠️ Pas d'horaires affichés dans le contenu (présents uniquement dans schema)

---

## 10. Conformité légale FR

⚠️ **Alerte** : liens `href="#"` dans le footer pour :
- Mentions légales (obligation L111-1 Code Conso)
- Conditions générales (obligation location véhicule)

→ **Risque légal** + **perte de confiance SEO** (Google déprécie les sites sans mentions légales visibles).

---

## 11. Couverture concurrentielle (requêtes cibles)

### Requêtes principales recommandées

| Requête | Intent | Volume estimé (FR/PACA) | Position estimée actuelle |
|---|---|---|---|
| location camion équestre trets | Local transactional | Faible mais haute intention | ? (à vérifier GSC) |
| location camion chevaux bouches du rhône | Local transactional | Moyen | ? |
| location van chevaux aix-en-provence | Local navigationnal | Moyen-haut | Non ciblé |
| louer camion cheval 2 places | Transactional | Moyen | ? |
| camion STX AKX location | Branded product | Faible | Probable top 5 |
| transport cheval permis B | Informational long-tail | Moyen | Non ciblé (pas de contenu) |

### Opportunités "ville proche"

Créer des pages ville secondaires ciblant :
- `/location-camion-equestre-aix-en-provence.html`
- `/location-camion-equestre-marseille.html`
- `/location-camion-equestre-salon-de-provence.html`

(⚠️ attention au risque de thin content / doorway pages — contenu original requis)

---

## Matrice de priorité

| Priorité | Catégorie | Tâche | Impact | Effort |
|---|---|---|---|---|
| 🔴 Critical | Légal | Créer pages Mentions légales + CGV | Haut | 2h |
| 🔴 Critical | Local SEO | Créer fiche Google Business Profile | Très haut | 1h |
| 🔴 Critical | Indexation | Soumettre sitemap à Search Console + Bing Webmaster | Haut | 30min |
| 🟠 High | Schema | Ajouter `AggregateRating` + `Review` dans LocalBusiness | Haut | 1h |
| 🟠 High | Content | Ajouter FAQ avec schema `FAQPage` (homepage ou tarifs) | Haut | 2h |
| 🟠 High | Content | Ajouter section "Avis clients" (extraits Horsicar 4.9/5) | Haut | 1h |
| 🟠 High | AI Search | Créer `/llms.txt` racine | Moyen | 30min |
| 🟠 High | Maillage | Ajouter liens contextuels inter-pages | Moyen | 1h |
| 🟡 Medium | Schema | Ajouter `BreadcrumbList` + breadcrumbs visuels | Moyen | 1h30 |
| 🟡 Medium | Schema | Remplacer `Product` par `VehicleRental` sur /camion | Moyen | 30min |
| 🟡 Medium | Perf | Preload + fetchpriority sur image hero | Faible | 30min |
| 🟡 Medium | Perf | Compresser davantage les WebP (238→150 KB) | Faible | 30min |
| 🟡 Medium | Technical | Ajouter headers sécurité (CSP, X-Frame, Referrer) | Faible | 1h |
| 🟡 Medium | Technical | Favicon .ico + apple-touch-icon | Faible | 30min |
| 🟢 Low | Content | Créer 2-3 pages "ville" (Aix, Marseille, Salon) | Moyen-haut | 4-6h |
| 🟢 Low | Content | Créer un blog avec 3-5 articles longue traîne | Haut (long-terme) | 10h+ |
| 🟢 Low | Citations | Inscription annuaires locaux + équestres | Moyen | 3h |

---

## Signaux de confiance à ajouter

1. **Bandeau "Noté 4.9/5 sur Horsicar — 9 avis"** en haut de la homepage
2. **Section testimonials** avec 3 avis verbatim (demander autorisation aux clients)
3. **Badge assurance** (logo assureur si permis)
4. **Photo + prénom** du propriétaire + signature "Par [Prénom], propriétaire à Trets"
5. **Garantie / engagement** (ex: "Véhicule nettoyé & désinfecté avant chaque location")

---

**Voir** `ACTION-PLAN.md` pour le plan d'action priorisé chronologique.
