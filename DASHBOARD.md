# Dashboard Carnet Bien-être

Dashboard complet pour le projet **Carnet Bien-être**, une plateforme d'accompagnement des managers sur 52 semaines (365 jours) à travers différents piliers du bien-être.

## 🎯 Fonctionnalités Principales

### 1. **Vue d'ensemble des statistiques**

- Jours complétés
- Taux de réalisation global
- Série de réussite (streak)
- Points et niveau de gamification

### 2. **Progression par Piliers**

Six piliers thématiques avec suivi individuel :

- 🧠 **Santé Mentale** - Gestion du stress et bien-être émotionnel
- ⚖️ **Équilibre Vie Pro-Perso** - Harmonisation travail/vie personnelle
- 💪 **Bien-être Physique** - Santé corporelle et activité physique
- 🌱 **Développement Personnel** - Apprentissage et croissance
- ❤️ **Relations Interpersonnelles** - Communication et connexions
- 🎨 **Créativité** - Innovation et expression personnelle

### 3. **Calendrier des 52 Semaines**

- Visualisation interactive de toutes les semaines
- Code couleur selon l'état de progression
- Tooltip détaillé au survol
- Indication du pilier principal par semaine

### 4. **Gamification**

- Système de points et niveaux
- Badges à débloquer
- Suivi des séries de réussite
- Progression vers le niveau suivant

### 5. **Prochaine Étape**

- Affichage de la tâche du jour
- Système de verrouillage progressif
- Déblocage après validation de l'étape précédente

## 📁 Structure des Composants

```
src/
├── components/
│   └── dashboard/
│       ├── stats-card.tsx           # Carte de statistique individuelle
│       ├── progress-circle.tsx      # Cercle de progression globale
│       ├── pillar-progress.tsx      # Progression des piliers
│       ├── gamification-panel.tsx   # Panel badges/points/streaks
│       ├── weekly-calendar.tsx      # Calendrier 52 semaines
│       └── next-task-card.tsx       # Carte prochaine tâche
├── types/
│   └── dashboard.ts                 # Types TypeScript
├── lib/
│   └── mock-data.ts                 # Données de test
└── app/
    └── page.tsx                     # Page dashboard principale
```

## 🎨 Design System

### Couleurs FocusRH

- **Primaire (Vert)**: `#8bc540`
- **Secondaire (Bleu)**: `#1c75bc`
- **Gris**: `#6e6e6e`

### Composants UI

Le projet utilise **shadcn/ui** avec Tailwind CSS pour une interface cohérente et accessible.

## 🚀 Utilisation

### Installation des dépendances

```bash
pnpm install
```

### Lancement en développement

```bash
pnpm dev
```

Le dashboard sera accessible sur `http://localhost:3000`

## 📊 Données Mock

Les données de démonstration sont disponibles dans `src/lib/mock-data.ts` :

- 42 jours complétés sur 365
- Semaine 7 en cours
- 6 piliers avec progression différenciée
- 4 badges (2 débloqués, 2 verrouillés)
- Série actuelle de 7 jours

## 🔒 Système de Verrouillage

Le parcours est **strictement séquentiel** :

1. L'utilisateur ne peut accéder qu'à la tâche du jour actuel
2. La tâche suivante se débloque uniquement après validation de la précédente
3. Les semaines futures sont verrouillées et affichées en gris dans le calendrier

## 📱 Responsive Design

Le dashboard est entièrement responsive :

- **Mobile** : Vue en colonne unique
- **Tablette** : Grille 2 colonnes
- **Desktop** : Grille 3 colonnes avec sidebar

## 🎯 Prochaines Étapes

### Backend à implémenter

- [ ] API de récupération des données utilisateur
- [ ] Système d'authentification
- [ ] Sauvegarde de la progression
- [ ] Gestion des badges et points
- [ ] Historique des activités

### Fonctionnalités additionnelles

- [ ] Graphiques de progression temporelle
- [ ] Comparaison avec d'autres utilisateurs (anonymisée)
- [ ] Notifications push pour les rappels quotidiens
- [ ] Export PDF du parcours
- [ ] Mode sombre

## 🛠️ Technologies

- **Next.js 16** - Framework React
- **TypeScript** - Typage statique
- **Tailwind CSS** - Styling
- **shadcn/ui** - Composants UI
- **Lucide React** - Icônes
- **Recharts** - Graphiques (à venir)

## 📝 Notes Importantes

- Le système de gamification encourage l'engagement quotidien
- Les piliers sont équilibrés sur les 52 semaines
- Chaque semaine a un pilier principal mais peut inclure d'autres piliers
- Le déblocage progressif assure un parcours structuré et pédagogique

---

**Développé pour FocusRH** - Transformez votre organisation, un jour à la fois 🌟
