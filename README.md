# ✦ MY HOUSE Showroom • Hammam Sousse

> **L'art de vivre et de bâtir avec distinction.**  
> Showroom de référence spécialisé dans le Carrelage & Grès cérame grand format, les Sanitaires & Salles de bain d'exception et l'Électroménager contemporain encastrable à Hammam Sousse, Tunisie.

[![Site Officiel](https://img.shields.io/badge/Site-myhouse2026.vercel.app-C8A96E?style=for-the-badge&logo=vercel)](https://myhouse2026.vercel.app)
[![Édition](https://img.shields.io/badge/Édition-2026-B3202A?style=for-the-badge)](https://myhouse2026.vercel.app/catalogues.html)
[![Tunisie](https://img.shields.io/badge/Showroom-Hammam_Sousse-17191B?style=for-the-badge)](https://myhouse2026.vercel.app/contact.html)

---

## 🏛️ Présentation

Le projet web **MY HOUSE** est conçu comme une **matériauthèque interactive et haut de gamme** destinée aux architectes, décorateurs d'intérieur, promoteurs et particuliers exigeants.  
Il offre une expérience fluide, rapide et immersive pour explorer les collections, feuilleter les catalogues officiels comme de véritables livres reliés, et préparer sa visite au showroom.

- **Localisation :** Route de la Plage (à côté de City Market), Hammam Sousse 4011, Tunisie
- **Téléphone / Devis WhatsApp :** `+216 51 056 656`
- **Déploiement en production :** [myhouse2026.vercel.app](https://myhouse2026.vercel.app)

---

## 🌟 Les 3 Univers d'Exception

1. **Carrelage & Grès Cérame Grand Format**
   - Collections effet marbre de prestige (Calacatta Gold, Sahara Noir, Statuario Superior, etc.)
   - Pierres naturelles architecturales, travertins contemporains & bétons cirés
   - Dalles extérieures 20 mm pour terrasses et tours de piscine
   - Formats d'exception : 60×120, 120×120, 120×278 cm

2. **Sanitaires & Salles de Bain d'Exception**
   - Baignoires îlots contemporaines en résine minérale & baignoires balnéothérapie
   - Receveurs minéraux ardoisés extra-plats et douches à l'italienne
   - Meubles suspendus haut de gamme, vasques à poser en céramique et plans vasque pierre
   - Robinetterie design (laiton brossé, noir mat, chrome miroir)

3. **Électroménager Contemporain & Cuisines**
   - Tables de cuisson induction avec hotte aspirante intégrée affleurante
   - Fours encastrables multifonctions 66 L haute précision (finitions inox brossé & verre noir miroir)
   - Fours micro-ondes combinés 25 L encastrables
   - Hottes îlot & murales de haute puissance acoustique

---

## 🚀 Fonctionnalités Clés

### 📖 1. Lecteur de Catalogues Interactif 3D (`catalogues.html`)
- **Véritable simulation de livre relié :** Feuilletez les catalogues officiels MY HOUSE 2026 avec rotation réaliste des pages et ombrage central de reliure.
- **Mode Paysage Plein Écran optimisé :** Affichage automatique en **double-page spread côte à côte** en mode paysage sur ordinateur, tablette et smartphone.
- **Contrôles ultra-rapides :** Curseur slider de navigation, saut direct de page en page, boutons `±10 pages`, début / fin, zoom haute définition jusqu'à 170 %.
- **Téléchargement direct des PDF officiels** haute résolution et lien devis WhatsApp direct par page.

### 🧭 2. Guide Interactif du Visiteur (Format Horizontal Panoramique)
- Guide d'accueil automatique à la première visite et réactivable via la pastille flottante `✦ Guide : Préparer mon projet`.
- Présentation panoramique en **3 étapes horizontales** :
  1. **📖 Feuilletez & Explorez** les 3 univers et catalogues interactifs en haute définition.
  2. **📸 Capturez vos Coups de Cœur** en prenant en photo ou capture d'écran les références et articles préférés.
  3. **📍 Venez au Showroom** avec vos captures et vos plans pour toucher les matières réelles et finaliser votre devis sur-mesure.

### 🔍 3. Matériauthèque & Filtrage Avancé (`collections.html`)
- Filtres dynamiques instantanés par univers, finitions, styles et dimensions.
- Au minimum 4 à 8 articles par sous-catégorie avec fiches techniques détaillées (référence, dimensions, finitions, matières, statut de disponibilité showroom).
- Bouton de demande de devis instantané personnalisé sur WhatsApp.

### 🌐 4. Bilingue & Animations Fluides
- Sélecteur bilingue Français / Arabe (`i18n.js`).
- Animations fluides d'apparition au défilement (`IntersectionObserver`).
- Suivi de fréquentation discret via Vercel Web Analytics.

---

## 📁 Architecture du Projet

```text
MYHOUSE/
├── index.html              # Page d'accueil officielle & vitrine du showroom
├── collections.html        # Matériauthèque complète & catalogue produits interactif
├── catalogues.html         # Lecteur flipbook 3D interactif des catalogues 2026
├── inspirations.html       # Galerie d'ambiances & projets architecturaux
├── salles-de-bain.html     # Focus dédié à l'univers bain & balnéothérapie
├── a-propos.html           # Histoire, vision et savoir-faire MY HOUSE
├── contact.html            # Accès showroom, horaires, carte & formulaire de contact
├── favicon.svg             # Favicon vectoriel officiel MY HOUSE
│
├── css/
│   ├── style.css           # Feuille de style principale (design system, typographies, responsive)
│   └── animations.css      # Animations de transition, reveals et keyframes
│
├── js/
│   ├── main.js             # Logique applicative, gestion du guide et navigation
│   ├── products-data.js    # Base de données des articles et caractéristiques techniques
│   ├── i18n.js             # Dictionnaire et moteur de traduction FR/AR
│   └── animations.js       # Gestion des déclencheurs de défilement et visibilité
│
└── assets/
    ├── brand/              # Logos vectoriels officiel MY HOUSE (noir, blanc, icônes)
    ├── catalogues/         # Fichiers PDF officiels 2026 & planches HD découpées
    └── images/
        ├── carrelage/      # Visuels de carreaux, dalles et textures grès cérame
        ├── electro/        # Photos studio des appareils électroménagers encastrables
        ├── headers/        # Visuels panoramiques hero pour chaque univers
        ├── inspirations/   # Photos d'architectes et ambiances complètes
        └── sanitaire/      # Baignoires, receveurs, meubles et vasques haute fidélité
```

---

## 🛠️ Installation & Développement Local

Le projet est conçu en **HTML5 / CSS3 moderne / JavaScript ES6+ Vanilla**, sans framework lourd requis.

### Prérequis
- Un navigateur web moderne (Chrome, Edge, Safari, Firefox).
- Optionnel : Node.js pour un serveur local de prévisualisation (ou extension *Live Server* dans VS Code / Antigravity).

### Lancer en local
```bash
# Avec npx serve
npx serve .

# Ou avec Python
python -m http.server 3000
```
Ouvrez ensuite [http://localhost:3000](http://localhost:3000) dans votre navigateur.

---

## 🚢 Déploiement & Git Remotes

Le projet est synchronisé en continu sur deux dépôts distants :
- **GitHub Dépôt Principal :** `https://github.com/linabouallegue13/MYHOUSE.git`
- **Vercel Dépôt Déploiement :** `https://github.com/linabouallegue13/myhouse2026.git`

Pour déployer les modifications sur les deux dépôts simultanément :
```bash
git add -A
git commit -m "feat: description des améliorations"
git push origin main
git push vercel main
```

---

## 🔒 Charte de Marque & Directives Exclusives
- Les produits présentés au showroom sont commercialisés sous la signature exclusive et l'enseigne **MY HOUSE**.
- Aucune marque tierce ou fabricant d'origine ne doit figurer dans le code source visible ou les textes du site afin de garantir l'exclusivité de l'expérience client au showroom.

---

## 📞 Contact Showroom

- **Adresse :** Route de la Plage (à côté de City Market), Hammam Sousse 4011, Tunisie
- **Téléphone :** `+216 51 056 656`
- **WhatsApp :** [Discuter avec un conseiller](https://wa.me/21651056656)
- **Instagram :** [@myhouse.sousse2026](https://www.instagram.com/myhouse.sousse2026)
- **Horaires :** Lundi au Samedi de 08:00 à 19:00

---
*© 2026 MY HOUSE Showroom Hammam Sousse. Tous droits réservés.*
