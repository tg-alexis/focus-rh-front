# 🌟 Carnet Bien-être - Architecture Frontend

## 📋 Table des Matières

- [Vue d'ensemble](#vue-densemble)
- [Structure du projet](#structure-du-projet)
- [Navigation](#navigation)
- [Composants](#composants)
- [Pages](#pages)
- [Démarrage](#démarrage)

## 🎯 Vue d'ensemble

**Carnet Bien-être** est une plateforme web accompagnant les managers sur 52 semaines (365 jours) à travers 6 piliers du bien-être :

- 🧠 **Santé Mentale** - Gestion du stress et bien-être émotionnel
- ⚖️ **Équilibre Vie Pro-Perso** - Harmonisation travail/vie personnelle
- 💪 **Bien-être Physique** - Santé corporelle et activité physique
- 🌱 **Développement Personnel** - Apprentissage et croissance
- ❤️ **Relations Interpersonnelles** - Communication et connexions
- 🎨 **Créativité** - Innovation et expression personnelle

## 🏗️ Structure du Projet

```
focus-rh-front/
├── src/
│   ├── app/                          # Pages Next.js (App Router)
│   │   ├── page.tsx                  # Dashboard principal
│   │   ├── daily-task/
│   │   │   └── page.tsx             # Page tâche du jour
│   │   └── layout.tsx               # Layout racine
│   │
│   ├── components/
│   │   ├── dashboard/               # Composants du dashboard
│   │   │   ├── stats-card.tsx
│   │   │   ├── progress-circle.tsx
│   │   │   ├── pillar-progress.tsx
│   │   │   ├── gamification-panel.tsx
│   │   │   ├── weekly-calendar.tsx
│   │   │   └── next-task-card.tsx
│   │   │
│   │   └── layout/                  # Composants de navigation
│   │       ├── sidebar.tsx
│   │       ├── mobile-nav.tsx
│   │       └── dashboard-layout.tsx
│   │
│   ├── types/
│   │   └── dashboard.ts             # Types TypeScript
│   │
│   └── lib/
│       └── mock-data.ts             # Données de démonstration
│
├── components/                       # Composants UI (shadcn)
│   └── ui/
│       ├── button.tsx
│       ├── card.tsx
│       ├── input.tsx
│       └── ...
│
├── public/                          # Assets statiques
├── styles/
│   └── globals.css                  # Styles globaux + Tailwind
│
└── Documentation/
    ├── DASHBOARD.md                 # Doc du dashboard
    └── SIDEBAR.md                   # Doc de la navigation

```

## 🧭 Navigation

### Desktop (≥ 1024px)

- **Sidebar rétractable** avec tous les menus
- Toggle pour mode collapsed/expanded
- Tooltips en mode collapsed
- Menu hiérarchique avec sous-menus

### Mobile (< 1024px)

- **Bottom Navigation Bar** avec 4 actions principales
- **Menu Burger** (slide-in) avec navigation complète
- Responsive et optimisé pour le touch

### Menus Principaux

```
📊 Tableau de bord       → /
📅 Tâche du jour         → /daily-task (badge notification)
📚 Piliers               → /pillars
   ├── 🧠 Santé Mentale
   ├── ⚖️ Équilibre
   ├── 💪 Physique
   └── 🌱 Développement
📈 Ma Progression        → /progress
🏆 Badges & Récompenses  → /achievements
❓ Aide & Support        → /help
⚙️ Paramètres           → /settings
```

## 🎨 Composants

### Dashboard

| Composant           | Description                       | Props                             |
| ------------------- | --------------------------------- | --------------------------------- |
| `StatsCard`         | Carte de statistique avec icône   | `title`, `value`, `icon`, `trend` |
| `ProgressCircle`    | Cercle de progression animé       | `stats`                           |
| `PillarProgress`    | Barres de progression des piliers | `pillars[]`                       |
| `GamificationPanel` | Points, niveaux, badges           | `stats`, `recentBadges[]`         |
| `WeeklyCalendar`    | Calendrier 52 semaines            | `weekProgress[]`, `currentWeek`   |
| `NextTaskCard`      | Prochaine tâche à faire           | `nextTask`, `onStartTask`         |

### Layout

| Composant         | Description                   | Props              |
| ----------------- | ----------------------------- | ------------------ |
| `DashboardLayout` | Wrapper avec sidebar + header | `children`, `user` |
| `Sidebar`         | Navigation latérale desktop   | -                  |
| `MobileNav`       | Navigation mobile             | -                  |

## 📄 Pages

### `/` - Dashboard Principal

- Vue d'ensemble complète
- 4 cartes de stats principales
- Progression circulaire
- Calendrier des 52 semaines
- Panel de gamification
- Prochaine tâche

### `/daily-task` - Tâche du Jour

- Détail de la tâche quotidienne
- Instructions étape par étape
- Validation de complétion
- Stats de progression
- Points à gagner

### Pages à créer (futures)

- `/pillars/[pillar]` - Détail d'un pilier
- `/progress` - Historique et statistiques
- `/achievements` - Badges et récompenses
- `/settings` - Paramètres utilisateur
- `/help` - Aide et support

## 🎯 Fonctionnalités Clés

### 1. Gamification

- **Points** : Gagnés en complétant les tâches
- **Niveaux** : Progression tous les 1000 points
- **Badges** : Débloqués selon les achievements
- **Streaks** : Séries de jours consécutifs

### 2. Progression

- **Taux de réalisation** : Pourcentage global
- **Calendrier visuel** : 52 semaines avec code couleur
- **Suivi par pilier** : Progression individuelle
- **Statistiques** : Historique et tendances

### 3. Parcours Séquentiel

- **Déblocage progressif** : Une tâche par jour
- **Verrouillage** : Les tâches futures sont locked
- **Validation** : Marquer comme complété pour débloquer

## 🚀 Démarrage

### Installation

```bash
# Installer les dépendances
pnpm install

# Lancer en développement
pnpm dev

# Build pour production
pnpm build

# Lancer en production
pnpm start
```

### Variables d'environnement

```env
# À créer : .env.local
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## 🛠️ Technologies

| Tech             | Version | Usage                           |
| ---------------- | ------- | ------------------------------- |
| **Next.js**      | 16.0.1  | Framework React avec App Router |
| **React**        | 19.2.0  | Bibliothèque UI                 |
| **TypeScript**   | 5.9.3   | Typage statique                 |
| **Tailwind CSS** | 4.1.17  | Styling utilitaire              |
| **shadcn/ui**    | -       | Composants UI accessibles       |
| **Lucide React** | 0.553.0 | Icônes                          |
| **Recharts**     | 2.15.4  | Graphiques (à venir)            |

## 🎨 Design System

### Couleurs FocusRH

```css
/* Primaire (Vert) */
--primary-500: #8bc540

/* Secondaire (Bleu) */
--secondary-500: #1c75bc

/* Gris */
--gray-500: #6e6e6e
```

### Breakpoints

```css
sm:  640px   /* Tablette portrait */
md:  768px   /* Tablette landscape */
lg:  1024px  /* Desktop */
xl:  1280px  /* Large desktop */
2xl: 1536px  /* Extra large */
```

## 📊 Données Mock

Les données de démonstration sont dans `src/lib/mock-data.ts` :

- 1 utilisateur (Marie Dupont, Niveau 3)
- 42 jours complétés sur 365
- 6 piliers avec progression
- 4 badges (2 débloqués)
- Série actuelle de 7 jours

## 🔐 Authentification (À implémenter)

```tsx
// Exemple de protection de route
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";

export default async function ProtectedPage() {
	const session = await getSession();

	if (!session) {
		redirect("/login");
	}

	return <DashboardLayout>...</DashboardLayout>;
}
```

## 📱 Responsive Design

### Mobile First

- Layouts adaptables avec Tailwind
- Bottom navigation native
- Touch-friendly (min 44x44px pour les zones de touch)
- Images optimisées

### Desktop Enhanced

- Sidebar rétractable
- Tooltips informatifs
- Grilles multi-colonnes
- Animations fluides

## 🧪 Tests (À implémenter)

```bash
# Tests unitaires
pnpm test

# Tests E2E
pnpm test:e2e

# Coverage
pnpm test:coverage
```

## 📈 Performance

### Optimisations Next.js

- Image optimization automatique
- Code splitting par route
- Server Components par défaut
- Incremental Static Regeneration (ISR)

### Bundle Analysis

```bash
# Analyser la taille du bundle
pnpm build
pnpm analyze
```

## 🔄 Prochaines Étapes

### Backend API

- [ ] Authentification JWT
- [ ] CRUD utilisateurs
- [ ] Gestion des tâches
- [ ] Système de badges
- [ ] Historique de progression

### Fonctionnalités

- [ ] Notifications push
- [ ] Mode sombre
- [ ] Export PDF du parcours
- [ ] Partage social des achievements
- [ ] Comparaison anonyme avec d'autres utilisateurs

### UX/UI

- [ ] Animations micro-interactions
- [ ] Feedback haptique (mobile)
- [ ] Sons de validation
- [ ] Onboarding interactif
- [ ] Aide contextuelle

## 📚 Documentation Complémentaire

- [DASHBOARD.md](./DASHBOARD.md) - Documentation du dashboard
- [SIDEBAR.md](./SIDEBAR.md) - Documentation de la navigation
- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com)

## 🤝 Contribution

Pour contribuer au projet :

1. Fork le repository
2. Créer une branche feature (`git checkout -b feature/amazing-feature`)
3. Commit les changements (`git commit -m 'Add amazing feature'`)
4. Push vers la branche (`git push origin feature/amazing-feature`)
5. Ouvrir une Pull Request

## 📝 Licence

© 2024 FocusRH - Tous droits réservés

---

**Développé avec ❤️ pour FocusRH** - Transformez votre organisation, un jour à la fois 🌟
