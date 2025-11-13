# 🗺️ Routes et Navigation - Carnet Bien-être

## Routes Disponibles

### ✅ Pages Implémentées

| Route         | Nom               | Description                          | Fichier                       |
| ------------- | ----------------- | ------------------------------------ | ----------------------------- |
| `/`           | Dashboard         | Vue d'ensemble complète              | `src/app/page.tsx`            |
| `/daily-task` | Tâche du Jour     | Activité quotidienne avec validation | `src/app/daily-task/page.tsx` |
| `/pillars`    | Liste des Piliers | Vue d'ensemble des 6 piliers         | `src/app/pillars/page.tsx`    |

### 🚧 Pages à Créer

| Route               | Nom                  | Description                           | Priorité |
| ------------------- | -------------------- | ------------------------------------- | -------- |
| `/pillars/[pillar]` | Détail Pilier        | Détail d'un pilier spécifique         | Haute    |
| `/progress`         | Ma Progression       | Historique et statistiques détaillées | Haute    |
| `/achievements`     | Badges & Récompenses | Tous les badges disponibles           | Moyenne  |
| `/settings`         | Paramètres           | Configuration du profil               | Moyenne  |
| `/help`             | Aide & Support       | FAQ et support                        | Basse    |
| `/auth/login`       | Connexion            | Page de connexion                     | Haute    |
| `/auth/register`    | Inscription          | Création de compte                    | Haute    |
| `/onboarding`       | Onboarding           | Premier parcours utilisateur          | Moyenne  |

## Structure de Navigation

```
📱 Application
│
├── 🏠 Dashboard (/)
│   ├── Vue d'ensemble
│   ├── Stats principales
│   ├── Prochaine tâche
│   ├── Calendrier 52 semaines
│   └── Panel gamification
│
├── 📅 Tâche du Jour (/daily-task)
│   ├── Détail de la tâche
│   ├── Instructions
│   ├── Validation
│   └── Stats progression
│
├── 📚 Piliers (/pillars)
│   ├── 🧠 Santé Mentale (/pillars/mental-health)
│   ├── ⚖️ Équilibre (/pillars/work-life-balance)
│   ├── 💪 Physique (/pillars/physical-wellness)
│   ├── 🌱 Développement (/pillars/personal-growth)
│   ├── ❤️ Relations (/pillars/relationships)
│   └── 🎨 Créativité (/pillars/creativity)
│
├── 📈 Ma Progression (/progress)
│   ├── Historique
│   ├── Graphiques
│   ├── Statistiques
│   └── Export PDF
│
├── 🏆 Badges (/achievements)
│   ├── Badges débloqués
│   ├── Badges verrouillés
│   ├── Niveaux
│   └── Récompenses
│
├── ⚙️ Paramètres (/settings)
│   ├── Profil
│   ├── Notifications
│   ├── Préférences
│   └── Sécurité
│
└── ❓ Aide (/help)
    ├── FAQ
    ├── Tutoriels
    ├── Contact
    └── À propos
```

## Navigation dans le Code

### Utiliser le Router Next.js

```tsx
import Link from "next/link";
import { useRouter } from "next/navigation";

// Navigation avec Link (préféré)
<Link href="/daily-task">Tâche du jour</Link>;

// Navigation programmatique
const router = useRouter();
router.push("/daily-task");
```

### Paramètres d'URL

```tsx
// Route dynamique : /pillars/[pillar]/page.tsx
export default function PillarDetailPage({
	params,
}: {
	params: { pillar: string };
}) {
	const pillarId = params.pillar; // "mental-health"
	// ...
}

// Lien vers route dynamique
<Link href={`/pillars/${pillarId}`}>Voir le pilier</Link>;
```

### Query Parameters

```tsx
// URL : /progress?week=5&pillar=mental-health
import { useSearchParams } from "next/navigation";

const searchParams = useSearchParams();
const week = searchParams.get("week"); // "5"
const pillar = searchParams.get("pillar"); // "mental-health"
```

## Sidebar Menu Items

Configuration actuelle dans `src/components/layout/sidebar.tsx` :

```typescript
const menuItems: MenuItem[] = [
	{
		id: "dashboard",
		label: "Tableau de bord",
		icon: LayoutDashboard,
		href: "/",
	},
	{
		id: "daily",
		label: "Tâche du jour",
		icon: Calendar,
		href: "/daily-task",
		badge: "1", // Notification
	},
	{
		id: "pillars",
		label: "Piliers",
		icon: BookOpen,
		href: "/pillars",
		children: [
			// Sous-menus des piliers
		],
	},
	{
		id: "progress",
		label: "Ma Progression",
		icon: BarChart3,
		href: "/progress",
	},
	{
		id: "achievements",
		label: "Badges & Récompenses",
		icon: Trophy,
		href: "/achievements",
	},
];
```

## Redirections et Guards

### Protection de Routes

```tsx
// middleware.ts (à créer)
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
	const token = request.cookies.get("auth-token");

	// Protéger toutes les routes sauf /auth/*
	if (!token && !request.nextUrl.pathname.startsWith("/auth")) {
		return NextResponse.redirect(new URL("/auth/login", request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
```

### Redirection Conditionnelle

```tsx
import { redirect } from "next/navigation";

export default async function ProtectedPage() {
	const session = await getSession();

	if (!session) {
		redirect("/auth/login");
	}

	if (!session.user.hasCompletedOnboarding) {
		redirect("/onboarding");
	}

	return <Page />;
}
```

## URLs API (Backend)

### Endpoints Prévus

```
POST   /api/auth/login              # Connexion
POST   /api/auth/register           # Inscription
POST   /api/auth/logout             # Déconnexion
GET    /api/auth/me                 # Profil utilisateur

GET    /api/dashboard               # Données dashboard
GET    /api/tasks/today             # Tâche du jour
POST   /api/tasks/:id/complete      # Marquer complété

GET    /api/pillars                 # Liste des piliers
GET    /api/pillars/:id             # Détail pilier

GET    /api/progress                # Progression utilisateur
GET    /api/progress/history        # Historique

GET    /api/achievements            # Badges utilisateur
GET    /api/achievements/all        # Tous les badges

GET    /api/users/:id               # Profil
PATCH  /api/users/:id               # Modifier profil
```

## Gestion des États d'URL

### Active State dans Sidebar

```tsx
"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function NavItem({ href, children }: NavItemProps) {
	const pathname = usePathname();
	const isActive = pathname === href || pathname.startsWith(`${href}/`);

	return (
		<Link
			href={href}
			className={cn(
				"...",
				isActive && "bg-primary-100 text-primary-700 font-bold"
			)}
		>
			{children}
		</Link>
	);
}
```

### Scroll to Top

```tsx
"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function ScrollToTop() {
	const pathname = usePathname();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);

	return null;
}

// Dans layout.tsx
<body>
	<ScrollToTop />
	{children}
</body>;
```

## SEO et Metadata

### Configuration par Page

```tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Tableau de bord | Carnet Bien-être",
	description: "Suivez votre progression sur les 6 piliers du bien-être",
	openGraph: {
		title: "Carnet Bien-être",
		description: "52 semaines pour transformer votre organisation",
		images: ["/og-image.png"],
	},
};

export default function Page() {
	return <div>...</div>;
}
```

### Metadata Dynamique

```tsx
import { notFound } from "next/navigation";

export async function generateMetadata({
	params,
}: {
	params: { pillar: string };
}): Promise<Metadata> {
	const pillar = await getPillar(params.pillar);

	if (!pillar) {
		return {};
	}

	return {
		title: `${pillar.name} | Carnet Bien-être`,
		description: pillar.description,
	};
}
```

## Breadcrumbs

### Composant Fil d'Ariane

```tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";

export function Breadcrumbs() {
	const pathname = usePathname();
	const paths = pathname.split("/").filter(Boolean);

	return (
		<nav className="flex items-center gap-2 text-sm text-gray-600">
			<Link href="/" className="hover:text-primary-600">
				<Home className="h-4 w-4" />
			</Link>

			{paths.map((path, index) => {
				const href = `/${paths.slice(0, index + 1).join("/")}`;
				const isLast = index === paths.length - 1;

				return (
					<div key={path} className="flex items-center gap-2">
						<ChevronRight className="h-4 w-4" />
						{isLast ? (
							<span className="font-semibold text-gray-900">
								{formatPath(path)}
							</span>
						) : (
							<Link href={href} className="hover:text-primary-600">
								{formatPath(path)}
							</Link>
						)}
					</div>
				);
			})}
		</nav>
	);
}
```

## Notes Importantes

### Next.js App Router

- Utilise `app/` directory (pas `pages/`)
- Server Components par défaut
- Client Components avec `"use client"`
- Layouts imbriqués possible

### Performance

- Prefetching automatique avec `<Link>`
- Lazy loading des images avec `next/image`
- Code splitting par route

### TypeScript

- Types stricts pour les paramètres de route
- Autocomplétion dans les routes

---

**Navigation fluide, UX optimale** 🧭
