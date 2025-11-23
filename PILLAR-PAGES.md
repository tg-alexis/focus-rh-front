# 📚 Pages Piliers - Documentation

## Vue d'ensemble

Les pages de détail des piliers offrent une expérience complète et immersive pour chaque pilier du bien-être. Chaque page est conçue avec un design épuré et une logique claire pour faciliter le suivi et l'engagement des utilisateurs.

## 🎨 Architecture

### Structure des fichiers

```
src/
├── app/
│   └── pillars/
│       ├── page.tsx                    # Liste des piliers
│       └── [pillar]/
│           └── page.tsx                # Détail dynamique d'un pilier
│
├── components/
│   └── pillars/
│       ├── index.ts                    # Exports centralisés
│       ├── pillar-header.tsx          # En-tête avec gradient
│       ├── pillar-stats.tsx           # Statistiques du pilier
│       ├── task-list.tsx              # Liste des tâches
│       └── weekly-progress.tsx        # Progression hebdomadaire
│
├── types/
│   └── dashboard.ts                   # Types TypeScript
│
└── lib/
    └── mock-data.ts                   # Données des piliers + tâches
```

## 🚀 Routes disponibles

| Route                        | Description                 | Pilier                                       |
| ---------------------------- | --------------------------- | -------------------------------------------- |
| `/pillars/mental-health`     | Santé Mentale               | 🧠 Gestion du stress et bien-être émotionnel |
| `/pillars/work-life-balance` | Équilibre Vie Pro-Perso     | ⚖️ Harmoniser travail et vie personnelle     |
| `/pillars/physical-wellness` | Bien-être Physique          | 💪 Santé corporelle et activité physique     |
| `/pillars/personal-growth`   | Développement Personnel     | 🌱 Apprentissage et croissance continue      |
| `/pillars/relationships`     | Relations Interpersonnelles | ❤️ Communication et connexions humaines      |
| `/pillars/creativity`        | Créativité                  | 🎨 Innovation et expression personnelle      |

## 🎯 Composants

### 1. PillarHeader

**Responsabilité** : Afficher l'en-tête visuel du pilier avec gradient

**Props** :

```typescript
interface PillarHeaderProps {
	pillar: PillarDetail;
}
```

**Caractéristiques** :

- Gradient coloré unique par pilier
- Icône du pilier en grande taille
- Nom et description
- Badge de progression (pourcentage + jours)
- Design responsive (mobile/desktop)

### 2. PillarStats

**Responsabilité** : Afficher les statistiques clés du pilier

**Props** :

```typescript
interface PillarStatsProps {
	pillar: PillarDetail;
}
```

**Statistiques affichées** :

- ✅ Tâches complétées
- ⏰ Tâches restantes
- 📅 Semaines actives
- 📈 Taux de réussite
- 🏆 Points gagnés
- 🎯 Objectif total

**Design** :

- Grille responsive (2/3/6 colonnes)
- Icônes colorées dans cercles
- Hover effects
- Cartes cliquables (future fonctionnalité)

### 3. TaskList

**Responsabilité** : Afficher et gérer la liste des tâches du pilier

**Props** :

```typescript
interface TaskListProps {
	tasks: PillarTask[];
	pillarColor: string;
}
```

**Fonctionnalités** :

- ✅ Groupement par semaine
- 🔒 Indication des tâches verrouillées
- ✓ Marquage des tâches complétées
- 📝 Affichage détails au clic (expand/collapse)
- 📋 Étapes détaillées pour chaque tâche
- ⏱️ Durée estimée
- ▶️ Bouton "Commencer" pour tâches actives

**États des tâches** :

- **Completed** : Affichée avec ✓ vert et date de complétion
- **Active** : Peut être commencée, checkbox cliquable
- **Locked** : Grisée avec icône 🔒

### 4. WeeklyProgress

**Responsabilité** : Visualiser la progression hebdomadaire

**Props** :

```typescript
interface WeeklyProgressProps {
	pillar: PillarDetail;
}
```

**Fonctionnalités** :

- 📊 Vue d'ensemble (semaines complétées, en cours, à venir)
- 📅 Liste détaillée de toutes les semaines
- 🎨 Code couleur par statut
- 📈 Barre de progression par semaine
- 🔢 Pourcentage de complétion

## 📱 Système d'onglets

Chaque page de pilier contient 3 onglets :

### 1. Tâches

- Liste complète des tâches du pilier
- Groupées par semaine
- Détails et étapes au clic

### 2. Progression

- Statistiques hebdomadaires
- Vue d'ensemble de l'avancement
- Semaines complétées vs en cours

### 3. Ressources

- Guides et ressources utiles
- Liens vers contenus complémentaires
- Conseils pratiques numérotés
- Design avec cartes et icônes

## 🎨 Design System

### Couleurs par pilier

```typescript
const pillarColors = {
	"mental-health": {
		color: "bg-purple-500",
		gradient: "bg-linear-to-br from-purple-500 to-purple-700",
	},
	"work-life-balance": {
		color: "bg-blue-500",
		gradient: "bg-linear-to-br from-blue-500 to-blue-700",
	},
	"physical-wellness": {
		color: "bg-green-500",
		gradient: "bg-linear-to-br from-green-500 to-green-700",
	},
	"personal-growth": {
		color: "bg-yellow-500",
		gradient: "bg-linear-to-br from-yellow-500 to-yellow-700",
	},
	relationships: {
		color: "bg-pink-500",
		gradient: "bg-linear-to-br from-pink-500 to-pink-700",
	},
	creativity: {
		color: "bg-orange-500",
		gradient: "bg-linear-to-br from-orange-500 to-orange-700",
	},
};
```

### Conventions visuelles

- **Cartes** : `rounded-lg`, `shadow`, `hover:shadow-md`
- **Espacements** : `gap-4`, `gap-6`, `space-y-6`
- **Transitions** : `transition-all`, `transition-colors`
- **Textes** :
  - Titres : `font-bold text-gray-900`
  - Descriptions : `text-gray-600 leading-relaxed`
  - Labels : `text-sm text-gray-500`

## 📊 Types TypeScript

### PillarDetail

```typescript
interface PillarDetail extends Pillar {
	gradient: string;
	tasks: PillarTask[];
	resources: PillarResource[];
	tips: string[];
	pointsEarned?: number;
}
```

### PillarTask

```typescript
interface PillarTask {
	id: string;
	day: number;
	week: number;
	pillarId: string;
	title: string;
	description: string;
	completed: boolean;
	locked: boolean;
	completedAt?: Date;
	duration?: number;
	steps?: string[];
	points?: number;
}
```

### PillarResource

```typescript
interface PillarResource {
	title: string;
	description: string;
	icon: string;
	link?: string;
}
```

## 🔄 Flux utilisateur

### Navigation vers un pilier

1. Utilisateur clique sur un pilier depuis `/pillars`
2. Redirection vers `/pillars/[pillar-id]`
3. Chargement des données du pilier
4. Affichage de la page avec header + stats + onglets

### Interaction avec une tâche

1. Utilisateur clique sur une tâche non verrouillée
2. La tâche s'étend pour afficher les détails
3. Affichage des étapes à suivre
4. Bouton "Marquer comme complété" visible
5. Clic sur le bouton → API call (à implémenter)
6. Mise à jour de l'état et affichage de la confirmation

### Changement d'onglet

1. Clic sur un onglet (Tâches / Progression / Ressources)
2. Animation de transition
3. Affichage du contenu correspondant
4. État de l'URL peut être mis à jour (future fonctionnalité)

## 🚧 Fonctionnalités à implémenter

### Backend Integration

- [ ] API endpoints pour récupérer les détails des piliers
- [ ] Endpoint pour marquer une tâche comme complétée
- [ ] Synchronisation en temps réel de la progression
- [ ] Système de points et récompenses

### UX Améliorée

- [ ] Animations de transition entre onglets
- [ ] Filtres pour les tâches (complétées/actives/toutes)
- [ ] Recherche dans les tâches
- [ ] Export PDF du pilier et sa progression
- [ ] Partage social des accomplissements

### Gamification

- [ ] Animation lors de la complétion d'une tâche
- [ ] Confettis pour semaines complétées
- [ ] Badges spécifiques au pilier
- [ ] Comparaison avec objectifs personnels

### Mobile

- [ ] Swipe pour naviguer entre tâches
- [ ] Mode hors-ligne pour consulter les tâches
- [ ] Notifications push pour rappels

## 📈 Données Mock

Chaque pilier contient :

- **52 semaines** de contenu
- **4-7 tâches détaillées** par pilier (dans les mock data)
- **3-4 ressources** complémentaires
- **5 conseils pratiques**

### Exemple de tâche (Santé Mentale)

```typescript
{
  id: "mh-1",
  day: 1,
  week: 1,
  pillarId: "mental-health",
  title: "Introduction à la pleine conscience",
  description: "Découvrez les bases de la méditation...",
  completed: true,
  locked: false,
  completedAt: new Date("2024-09-01"),
  duration: 10,
  points: 50,
  steps: [
    "Trouvez un endroit calme",
    "Asseyez-vous confortablement",
    "Fermez les yeux",
    "Concentrez-vous sur votre respiration",
    "Observez vos pensées sans jugement"
  ]
}
```

## 🎓 Bonnes pratiques

### Performance

- Utiliser `"use client"` uniquement quand nécessaire
- Lazy loading des images et ressources
- Pagination des tâches si > 20 par pilier
- Memoization des composants coûteux

### Accessibilité

- Labels ARIA sur tous les boutons
- Navigation au clavier
- Contraste suffisant (WCAG AA)
- Textes alternatifs pour icônes

### SEO

- Metadata dynamique par pilier
- URLs propres et explicites
- Structured data pour les tâches
- Open Graph pour partage social

## 🔗 Liens utiles

- [Documentation Tailwind CSS](https://tailwindcss.com)
- [shadcn/ui Components](https://ui.shadcn.com)
- [Next.js Dynamic Routes](https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes)
- [Lucide Icons](https://lucide.dev)

---

**Développé pour Carnet Bien-être** - Design épuré, logique claire, expérience optimale 🌟
