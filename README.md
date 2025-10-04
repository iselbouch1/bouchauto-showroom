# Bouch Auto - Catalogue Vitrine

Application front-end moderne pour un catalogue d'accessoires et décorations automobiles.

## 🚀 Technologies

- **React** 18 + **TypeScript**
- **Vite** (build tool ultra-rapide)
- **Tailwind CSS** (design system moderne)
- **React Router** (navigation)
- **React Query** (gestion data/cache)
- **shadcn/ui** (composants UI)

## 📦 Installation

```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev

# Build pour production
npm run build

# Preview du build
npm run preview

# Lint du code
npm run lint
```

L'application sera accessible sur `http://localhost:8080`

## 🎨 Architecture

### Structure des dossiers

```
src/
├── components/          # Composants réutilisables
│   ├── ui/             # Composants UI de base (shadcn)
│   ├── Header.tsx      # En-tête avec navigation et recherche
│   ├── Footer.tsx      # Pied de page
│   ├── ProductCard.tsx # Carte produit
│   ├── ProductGrid.tsx # Grille de produits
│   └── CategoryCard.tsx# Carte catégorie
├── pages/              # Pages de l'application
│   ├── Index.tsx       # Page d'accueil
│   ├── CategoryPage.tsx# Page catégorie
│   ├── ProductPage.tsx # Fiche produit
│   ├── SearchPage.tsx  # Résultats de recherche
│   └── NotFound.tsx    # Page 404
├── lib/                # Utilitaires et helpers
│   └── api.ts         # Adaptateur API avec mock data
├── data/               # Données mock JSON
│   ├── categories.json
│   └── products.json
├── types/              # Types TypeScript
│   └── index.ts
└── index.css          # Design system global
```

### Pages & Routes

- `/` - Accueil (hero, nouveautés, catégories, produits populaires)
- `/categories/:slug` - Liste des produits par catégorie
- `/produits/:slug` - Fiche produit détaillée
- `/recherche?q=...` - Résultats de recherche
- `*` - Page 404

## 🎯 Fonctionnalités

### ✅ Implémenté

- ✅ Navigation responsive avec recherche globale
- ✅ Grille de catégories avec images
- ✅ Cartes produits avec badges (Nouveau, Populaire, Best-seller)
- ✅ Fiche produit avec galerie d'images
- ✅ Recherche instantanée
- ✅ Filtres par catégorie
- ✅ Mock data avec types TypeScript
- ✅ Adaptateur API prêt pour intégration backend
- ✅ SEO optimisé (meta tags, semantic HTML)
- ✅ Animations fluides
- ✅ Design system cohérent
- ✅ Responsive mobile-first

### 🔜 À venir (backend)

- Pagination/infinite scroll
- Filtres avancés (tags, couleurs, matières)
- Tri (alphabétique, récence, popularité)
- Tests unitaires

## 🔌 Intégration API

### Configuration

Le projet est configuré pour basculer facilement entre mock data et API réelle :

1. Copier `.env.example` vers `.env`
2. Configurer les variables :

```env
USE_MOCK=false
VITE_API_BASE_URL=https://api.votresite.fr
```

### Endpoints API attendus

```typescript
// Catégories
GET /api/v1/categories
GET /api/v1/categories/{slug}

// Produits
GET /api/v1/products?search=...&category=...&tags[]=...&visible=1&featured=1&page=1&per_page=20
GET /api/v1/products/{slug}
```

### Format des données

Voir les types dans `src/types/index.ts` :

- `Category` : id, name, slug, description, parentId, image
- `Product` : id, name, slug, descriptions, categoryIds, tags, images, specs, etc.

## 🎨 Design System

Le design system est défini dans :
- `src/index.css` - Variables CSS (couleurs HSL, ombres, gradients)
- `tailwind.config.ts` - Configuration Tailwind (animations, keyframes)

### Couleurs principales

- **Primary** : Noir premium (#0A0A0A)
- **Accent** : Rouge dynamique (#DC2626)
- **Muted** : Gris métallique
- **Background** : Blanc cassé / Noir profond (dark mode)

### Animations

- `animate-fade-in` - Apparition en fondu
- `animate-fade-in-up` - Apparition + translation
- `animate-scale-in` - Zoom doux
- `animate-shine` - Effet brillance

## 📱 Responsive

Breakpoints Tailwind :
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1400px

## ♿ Accessibilité

- Navigation au clavier
- Textes alternatifs sur images
- Contrastes WCAG AA
- Semantic HTML (`<header>`, `<main>`, `<nav>`, `<footer>`)
- Focus visible sur tous les éléments interactifs

## 🚀 Performance

- Lazy loading des images (`loading="lazy"`)
- Code splitting automatique (Vite)
- Optimisation des images
- Cache avec React Query

## 📄 Licence

Tous droits réservés - Bouch Auto © 2025

## 🤝 Support

Pour toute question : contact@bouchauto.fr
