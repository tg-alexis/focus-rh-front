import { DashboardData } from "@/src/types/dashboard";

// Données mock pour le dashboard
export const mockDashboardData: DashboardData = {
	user: {
		id: "user-1",
		name: "Marie Dupont",
		avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marie",
	},
	stats: {
		totalDays: 365,
		completedDays: 42,
		currentStreak: 7,
		longestStreak: 14,
		completionRate: 11.5,
		points: 2450,
		level: 3,
		startDate: new Date("2024-09-01"),
		lastActivityDate: new Date(),
	},
	pillars: [
		{
			id: "mental-health",
			name: "Santé Mentale",
			description: "Gestion du stress et bien-être émotionnel",
			color: "bg-purple-500",
			icon: "🧠",
			progress: 15,
			completedDays: 8,
			totalDays: 52,
		},
		{
			id: "work-life-balance",
			name: "Équilibre Vie Pro-Perso",
			description: "Harmoniser travail et vie personnelle",
			color: "bg-blue-500",
			icon: "⚖️",
			progress: 12,
			completedDays: 6,
			totalDays: 52,
		},
		{
			id: "physical-wellness",
			name: "Bien-être Physique",
			description: "Santé corporelle et activité physique",
			color: "bg-green-500",
			icon: "💪",
			progress: 10,
			completedDays: 5,
			totalDays: 52,
		},
		{
			id: "personal-growth",
			name: "Développement Personnel",
			description: "Apprentissage et croissance continue",
			color: "bg-yellow-500",
			icon: "🌱",
			progress: 8,
			completedDays: 4,
			totalDays: 52,
		},
		{
			id: "relationships",
			name: "Relations Interpersonnelles",
			description: "Communication et connexions humaines",
			color: "bg-pink-500",
			icon: "❤️",
			progress: 13,
			completedDays: 7,
			totalDays: 52,
		},
		{
			id: "creativity",
			name: "Créativité",
			description: "Innovation et expression personnelle",
			color: "bg-orange-500",
			icon: "🎨",
			progress: 9,
			completedDays: 5,
			totalDays: 52,
		},
	],
	weekProgress: Array.from({ length: 52 }, (_, i) => {
		const weekNumber = i + 1;
		const startDate = new Date("2024-09-01");
		startDate.setDate(startDate.getDate() + i * 7);
		const endDate = new Date(startDate);
		endDate.setDate(endDate.getDate() + 6);

		const pillars = [
			"Santé Mentale",
			"Équilibre Vie Pro-Perso",
			"Bien-être Physique",
			"Développement Personnel",
			"Relations Interpersonnelles",
			"Créativité",
		];

		return {
			weekNumber,
			startDate,
			endDate,
			completedDays: weekNumber <= 6 ? Math.floor(Math.random() * 7) + 1 : 0,
			totalDays: 7,
			mainPillar: pillars[i % pillars.length],
		};
	}),
	currentWeek: 7,
	currentDay: 43,
	nextTask: {
		id: "task-43",
		day: 43,
		week: 7,
		pillarId: "mental-health",
		title: "Pratiquer la gratitude quotidienne",
		description:
			"Prenez 5 minutes pour noter trois choses pour lesquelles vous êtes reconnaissant aujourd'hui. Cette pratique améliore votre bien-être mental et votre perception positive de la vie.",
		completed: false,
		locked: false,
	},
	recentBadges: [
		{
			id: "badge-1",
			name: "Premier Pas",
			description: "Complétez votre premier jour",
			icon: "🎯",
			earnedAt: new Date("2024-09-01"),
			locked: false,
			category: "completion",
		},
		{
			id: "badge-2",
			name: "Semaine Parfaite",
			description: "Complétez une semaine entière",
			icon: "⭐",
			earnedAt: new Date("2024-09-08"),
			locked: false,
			category: "streak",
		},
		{
			id: "badge-3",
			name: "Esprit Zen",
			description: "Complétez 10 jours de Santé Mentale",
			icon: "🧘",
			locked: true,
			category: "pillar",
		},
		{
			id: "badge-4",
			name: "Équilibriste",
			description: "Complétez tous les piliers au moins une fois",
			icon: "🎪",
			locked: true,
			category: "special",
		},
	],
	allBadges: [],
};
