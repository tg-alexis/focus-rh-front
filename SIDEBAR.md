# Sidebar Navigation - Carnet Bien-être

Documentation complète du système de navigation avec sidebar pour le projet Carnet Bien-être.

## 🎯 Vue d'ensemble

Le système de navigation comprend :

- **Sidebar Desktop** - Menu latéral rétractable pour desktop
- **Mobile Navigation** - Menu burger + barre de navigation inférieure pour mobile
- **Layout Dashboard** - Composant wrapper qui gère l'ensemble

## 📁 Structure des Composants

```
src/components/layout/
├── sidebar.tsx              # Sidebar principale (desktop)
├── mobile-nav.tsx           # Navigation mobile
└── dashboard-layout.tsx     # Layout wrapper
```

## 🎨 Fonctionnalités de la Sidebar

### 1. **Menu Principal**

#### Navigation

- 📊 **Tableau de bord** - Vue d'ensemble
- 📅 **Tâche du jour** - Activité quotidienne (avec badge de notification)
- 📚 **Piliers** - Menu déroulant avec 6 sous-menus :
  - 🧠 Santé Mentale
  - ⚖️ Équilibre Vie Pro-Perso
  - 💪 Bien-être Physique
  - 🌱 Développement Personnel
  - ❤️ Relations Interpersonnelles
  - 🎨 Créativité
- 📈 **Ma Progression** - Statistiques et historique
- 🏆 **Badges & Récompenses** - Gamification

#### Menu Inférieur

- ❓ **Aide & Support**
- ⚙️ **Paramètres**
- 🚪 **Déconnexion**

### 2. **États et Interactions**

#### Mode Rétractable

- **Expanded** (256px) : Affichage complet avec labels
- **Collapsed** (80px) : Icônes seulement avec tooltips
- Bouton toggle pour basculer entre les modes
- Animation fluide de transition

#### Sous-menus

- Click pour expand/collapse
- Icône chevron avec rotation animée
- Indentation visuelle pour les sous-éléments

#### Badges de notification

- Badge rouge sur "Tâche du jour" (nombre de tâches)
- Visible en mode expanded et collapsed

#### Tooltips

- Affichage au survol en mode collapsed
- Positionnés à droite de la sidebar
- Style sombre avec fond noir

### 3. **Design System**

#### Couleurs

```css
/* État normal */
text-gray-700

/* État hover */
bg-primary-50 (vert clair)
text-primary-700 (vert foncé)

/* Badge */
bg-primary-500 (vert FocusRH)
text-white

/* Déconnexion hover */
bg-red-50
text-red-700
```

#### Espacements

- Padding items : `px-3 py-2.5`
- Gap entre icône et texte : `gap-3`
- Border radius : `rounded-lg`

## 📱 Navigation Mobile

### Bottom Navigation Bar

Barre fixée en bas avec 4 icônes principales :

- 🏠 Accueil
- 📅 Tâche
- 📊 Stats
- 🏆 Badges

### Menu Burger

- Slide-in depuis la gauche
- Overlay semi-transparent
- Liste complète des menus
- Fermeture automatique après sélection

### Responsive Breakpoints

```css
/* Mobile : < 1024px */
- Sidebar cachée
- Bottom nav visible
- Menu burger disponible

/* Desktop : ≥ 1024px */
- Sidebar visible
- Bottom nav cachée
- Menu burger caché
```

## 🚀 Utilisation

### Intégration dans une page

```tsx
import { DashboardLayout } from "@/src/components/layout/dashboard-layout";

export default function Page() {
	return (
		<DashboardLayout
			user={{
				name: "Marie Dupont",
				level: 3,
			}}
		>
			{/* Votre contenu ici */}
			<div>
				<h1>Mon contenu</h1>
			</div>
		</DashboardLayout>
	);
}
```

### Props du DashboardLayout

```typescript
interface DashboardLayoutProps {
	children: ReactNode; // Contenu de la page
	user?: {
		name: string; // Nom de l'utilisateur
		level: number; // Niveau actuel
		avatar?: string; // URL de l'avatar (optionnel)
	};
}
```

## 🎯 Navigation avec Next.js

### Liens internes

```tsx
import Link from "next/link";

<Link href="/daily-task">Tâche du jour</Link>;
```

### Active State

Pour ajouter un état actif aux liens (à implémenter) :

```tsx
import { usePathname } from "next/navigation";

const pathname = usePathname();
const isActive = pathname === item.href;

className={cn(
  "...",
  isActive && "bg-primary-100 text-primary-700"
)}
```

## 🔧 Personnalisation

### Ajouter un nouvel item au menu

Dans `sidebar.tsx` :

```tsx
const menuItems: MenuItem[] = [
	// ... items existants
	{
		id: "new-item",
		label: "Nouveau Menu",
		icon: MonIcone,
		href: "/nouveau-menu",
		badge: "3", // optionnel
	},
];
```

### Ajouter un sous-menu

```tsx
{
  id: "parent",
  label: "Menu Parent",
  icon: MonIcone,
  href: "/parent",
  children: [
    {
      id: "child-1",
      label: "Sous-menu 1",
      icon: IconeEnfant,
      href: "/parent/child-1",
    },
  ],
}
```

### Modifier les couleurs

Dans `tailwind.config` ou directement dans les composants :

```tsx
// Couleur de hover
hover:bg-primary-50 hover:text-primary-700

// Couleur des badges
bg-primary-500

// Modifier pour utiliser d'autres couleurs
hover:bg-secondary-50 hover:text-secondary-700
```

## 📊 État du Menu (Future)

Pour gérer l'état collapsed persistant :

```tsx
// Utiliser localStorage
const [isCollapsed, setIsCollapsed] = useState(() => {
	const saved = localStorage.getItem("sidebar-collapsed");
	return saved ? JSON.parse(saved) : false;
});

// Sauvegarder l'état
useEffect(() => {
	localStorage.setItem("sidebar-collapsed", JSON.stringify(isCollapsed));
}, [isCollapsed]);
```

## ♿ Accessibilité

### Améliorations à implémenter

- [ ] Attributs ARIA pour les menus déroulants
- [ ] Navigation au clavier (Tab, Enter, Espace)
- [ ] Focus visible sur les éléments
- [ ] Annonces screen reader pour les changements d'état

```tsx
// Exemple ARIA
<nav aria-label="Navigation principale">
	<button aria-expanded={isExpanded} aria-controls="submenu-id">
		Menu
	</button>
</nav>
```

## 🎨 Animations

### Transitions existantes

```css
/* Sidebar collapse/expand */
transition-all duration-300

/* Tooltip */
opacity-0 group-hover:opacity-100 transition-opacity

/* Chevron rotation */
transition-transform rotate-90
```

## 🐛 Dépannage

### La sidebar ne s'affiche pas

- Vérifier que le composant est utilisé avec `lg:block`
- Vérifier les z-index (sidebar: z-auto, overlay: z-40)

### Les tooltips sont coupés

- S'assurer que le parent a `overflow: visible`
- Ajuster le z-index (`z-50`)

### Le menu mobile ne se ferme pas

- Vérifier que `onClick={() => setIsOpen(false)}` est présent
- Vérifier l'overlay `onClick`

## 📝 TODO - Améliorations futures

- [ ] Ajouter l'état actif basé sur l'URL
- [ ] Persister l'état collapsed dans localStorage
- [ ] Ajouter des animations de transition plus fluides
- [ ] Implémenter l'accessibilité clavier complète
- [ ] Ajouter un mode sombre
- [ ] Intégrer les permissions utilisateur (cacher certains menus)
- [ ] Ajouter des badges dynamiques depuis le backend
- [ ] Statistiques de navigation pour analytics

---

**Développé pour FocusRH** - Navigation intuitive pour le Carnet Bien-être 🌟
