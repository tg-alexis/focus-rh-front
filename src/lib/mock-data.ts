import { DashboardData, PillarDetail } from "@/types/dashboard";

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

// Détails complets des piliers avec tâches
const pillarDetailsData: Record<string, PillarDetail> = {
	"mental-health": {
		id: "mental-health",
		name: "Santé Mentale",
		description: "Gestion du stress et bien-être émotionnel",
		color: "bg-purple-500",
		icon: "🧠",
		progress: 15,
		completedDays: 8,
		totalDays: 52,
		gradient: "bg-linear-to-br from-purple-500 to-purple-700",
		pointsEarned: 400,
		tasks: [
			{
				id: "mh-1",
				day: 1,
				week: 1,
				pillarId: "mental-health",
				title: "Introduction à la pleine conscience",
				description: "Découvrez les bases de la méditation de pleine conscience. Prenez 10 minutes pour vous asseoir confortablement, fermez les yeux et concentrez-vous sur votre respiration.",
				completed: true,
				locked: false,
				completedAt: new Date("2024-09-01"),
				duration: 10,
				points: 50,
				steps: [
					"Trouvez un endroit calme et confortable",
					"Asseyez-vous en gardant le dos droit",
					"Fermez les yeux doucement",
					"Concentrez-vous sur votre respiration naturelle",
					"Observez vos pensées sans les juger"
				]
			},
			{
				id: "mh-2",
				day: 2,
				week: 1,
				pillarId: "mental-health",
				title: "Journal de gratitude",
				description: "Commencez un journal de gratitude quotidien. Notez trois choses pour lesquelles vous êtes reconnaissant aujourd'hui.",
				completed: true,
				locked: false,
				completedAt: new Date("2024-09-02"),
				duration: 5,
				points: 50,
				steps: [
					"Prenez un carnet ou ouvrez un fichier",
					"Réfléchissez à votre journée",
					"Notez 3 choses positives",
					"Expliquez pourquoi vous êtes reconnaissant pour chacune"
				]
			},
			{
				id: "mh-3",
				day: 8,
				week: 2,
				pillarId: "mental-health",
				title: "Techniques de respiration anti-stress",
				description: "Apprenez la respiration 4-7-8 pour réduire le stress instantanément. Inspirez pendant 4 secondes, retenez 7 secondes, expirez pendant 8 secondes.",
				completed: false,
				locked: false,
				duration: 15,
				points: 50,
				steps: [
					"Installez-vous confortablement",
					"Inspirez par le nez pendant 4 secondes",
					"Retenez votre souffle pendant 7 secondes",
					"Expirez lentement par la bouche pendant 8 secondes",
					"Répétez 5 fois"
				]
			},
			{
				id: "mh-4",
				day: 15,
				week: 3,
				pillarId: "mental-health",
				title: "Identification des pensées limitantes",
				description: "Prenez conscience de vos pensées négatives automatiques et apprenez à les reformuler de manière constructive.",
				completed: false,
				locked: true,
				duration: 20,
				points: 50
			}
		],
		resources: [
			{
				title: "Guide de méditation pour débutants",
				description: "Un guide complet pour commencer la méditation de pleine conscience",
				icon: "📚",
				link: "#"
			},
			{
				title: "Application de méditation recommandée",
				description: "Découvrez les meilleures applications pour pratiquer au quotidien",
				icon: "📱",
				link: "#"
			},
			{
				title: "Vidéos d'exercices de respiration",
				description: "Tutoriels vidéo pour maîtriser les techniques de respiration",
				icon: "🎥",
				link: "#"
			}
		],
		tips: [
			"Pratiquez la méditation tous les matins, même 5 minutes suffisent pour commencer",
			"Créez un espace dédié à la méditation chez vous, calme et apaisant",
			"Utilisez des rappels sur votre téléphone pour ne pas oublier vos sessions",
			"Soyez patient avec vous-même, la méditation est une pratique qui s'améliore avec le temps",
			"Essayez différentes techniques pour trouver celle qui vous convient le mieux"
		]
	},
	"work-life-balance": {
		id: "work-life-balance",
		name: "Équilibre Vie Pro-Perso",
		description: "Harmoniser travail et vie personnelle",
		color: "bg-blue-500",
		icon: "⚖️",
		progress: 12,
		completedDays: 6,
		totalDays: 52,
		gradient: "bg-linear-to-br from-blue-500 to-blue-700",
		pointsEarned: 300,
		tasks: [
			{
				id: "wlb-1",
				day: 3,
				week: 1,
				pillarId: "work-life-balance",
				title: "Définir ses limites professionnelles",
				description: "Identifiez vos heures de travail idéales et communiquez-les clairement à votre équipe.",
				completed: true,
				locked: false,
				completedAt: new Date("2024-09-03"),
				duration: 30,
				points: 50,
				steps: [
					"Analysez vos horaires actuels",
					"Déterminez vos heures les plus productives",
					"Fixez des heures de début et de fin claires",
					"Communiquez ces limites à votre équipe",
					"Respectez vos propres limites"
				]
			},
			{
				id: "wlb-2",
				day: 10,
				week: 2,
				pillarId: "work-life-balance",
				title: "Rituel de déconnexion",
				description: "Créez un rituel qui marque la fin de votre journée de travail et le début de votre temps personnel.",
				completed: false,
				locked: false,
				duration: 15,
				points: 50,
				steps: [
					"Choisissez une activité symbolique (marche, musique, etc.)",
					"Rangez votre espace de travail",
					"Éteignez vos notifications professionnelles",
					"Pratiquez votre activité de transition",
					"Concentrez-vous sur vos activités personnelles"
				]
			}
		],
		resources: [
			{
				title: "Guide de la gestion du temps",
				description: "Techniques éprouvées pour mieux organiser votre journée",
				icon: "⏰",
				link: "#"
			},
			{
				title: "Checklist des limites saines",
				description: "Une liste pour établir et maintenir des limites professionnelles",
				icon: "✅",
				link: "#"
			}
		],
		tips: [
			"Désactivez les notifications professionnelles en dehors de vos heures de travail",
			"Planifiez des activités personnelles aussi sérieusement que vos réunions",
			"Apprenez à dire non aux demandes qui dépassent vos limites",
			"Créez un espace de travail séparé si vous télétravaillez",
			"Prenez vos pauses déjeuner loin de votre bureau"
		]
	},
	"physical-wellness": {
		id: "physical-wellness",
		name: "Bien-être Physique",
		description: "Santé corporelle et activité physique",
		color: "bg-green-500",
		icon: "💪",
		progress: 10,
		completedDays: 5,
		totalDays: 52,
		gradient: "bg-linear-to-br from-green-500 to-green-700",
		pointsEarned: 250,
		tasks: [
			{
				id: "pw-1",
				day: 4,
				week: 1,
				pillarId: "physical-wellness",
				title: "Routine d'étirements matinaux",
				description: "Commencez votre journée avec 10 minutes d'étirements pour réveiller votre corps en douceur.",
				completed: true,
				locked: false,
				completedAt: new Date("2024-09-04"),
				duration: 10,
				points: 50,
				steps: [
					"Étirez votre nuque en douceur",
					"Faites des rotations d'épaules",
					"Étirez vos bras et votre dos",
					"Faites des flexions latérales",
					"Terminez par des étirements des jambes"
				]
			},
			{
				id: "pw-2",
				day: 11,
				week: 2,
				pillarId: "physical-wellness",
				title: "Hydratation consciente",
				description: "Établissez un objectif d'hydratation quotidien et suivez votre consommation d'eau.",
				completed: false,
				locked: false,
				duration: 5,
				points: 50,
				steps: [
					"Calculez votre besoin en eau (30ml x poids corporel)",
					"Préparez votre bouteille d'eau",
					"Buvez un verre au réveil",
					"Définissez des rappels toutes les 2 heures",
					"Notez votre consommation"
				]
			}
		],
		resources: [
			{
				title: "Programme d'exercices pour débutants",
				description: "Routine simple à faire chez soi sans équipement",
				icon: "🏋️",
				link: "#"
			},
			{
				title: "Conseils nutritionnels",
				description: "Guide pour une alimentation équilibrée et énergisante",
				icon: "🥗",
				link: "#"
			}
		],
		tips: [
			"Commencez par de petits objectifs réalistes et augmentez progressivement",
			"L'activité physique ne signifie pas forcément sport intense - la marche compte aussi",
			"Écoutez votre corps et respectez vos limites",
			"Trouvez une activité que vous aimez pour maintenir la motivation",
			"Intégrez le mouvement dans votre quotidien (escaliers, marche active, etc.)"
		]
	},
	"personal-growth": {
		id: "personal-growth",
		name: "Développement Personnel",
		description: "Apprentissage et croissance continue",
		color: "bg-yellow-500",
		icon: "🌱",
		progress: 8,
		completedDays: 4,
		totalDays: 52,
		gradient: "bg-linear-to-br from-yellow-500 to-yellow-700",
		pointsEarned: 200,
		tasks: [
			{
				id: "pg-1",
				day: 5,
				week: 1,
				pillarId: "personal-growth",
				title: "Définir ses valeurs personnelles",
				description: "Identifiez vos 5 valeurs fondamentales qui guident vos décisions et actions.",
				completed: true,
				locked: false,
				completedAt: new Date("2024-09-05"),
				duration: 30,
				points: 50,
				steps: [
					"Réfléchissez aux moments où vous vous êtes senti épanoui",
					"Listez 10-15 valeurs importantes pour vous",
					"Classez-les par ordre d'importance",
					"Sélectionnez vos 5 valeurs principales",
					"Notez comment elles influencent votre vie"
				]
			},
			{
				id: "pg-2",
				day: 12,
				week: 2,
				pillarId: "personal-growth",
				title: "Objectifs SMART pour le trimestre",
				description: "Définissez 3 objectifs Spécifiques, Mesurables, Atteignables, Réalistes et Temporels.",
				completed: false,
				locked: false,
				duration: 45,
				points: 50,
				steps: [
					"Choisissez 3 domaines de développement",
					"Formulez chaque objectif selon la méthode SMART",
					"Définissez des étapes intermédiaires",
					"Identifiez les ressources nécessaires",
					"Planifiez un suivi régulier"
				]
			}
		],
		resources: [
			{
				title: "Bibliothèque de développement personnel",
				description: "Sélection de livres et podcasts inspirants",
				icon: "📖",
				link: "#"
			},
			{
				title: "Modèles d'objectifs SMART",
				description: "Templates prêts à utiliser pour vos objectifs",
				icon: "🎯",
				link: "#"
			}
		],
		tips: [
			"Consacrez au moins 15 minutes par jour à l'apprentissage",
			"Variez les sources d'apprentissage : livres, podcasts, cours en ligne",
			"Appliquez immédiatement ce que vous apprenez",
			"Tenez un journal de vos progrès et réflexions",
			"Entourez-vous de personnes qui vous inspirent et vous challengent"
		]
	},
	"relationships": {
		id: "relationships",
		name: "Relations Interpersonnelles",
		description: "Communication et connexions humaines",
		color: "bg-pink-500",
		icon: "❤️",
		progress: 13,
		completedDays: 7,
		totalDays: 52,
		gradient: "bg-linear-to-br from-pink-500 to-pink-700",
		pointsEarned: 350,
		tasks: [
			{
				id: "rel-1",
				day: 6,
				week: 1,
				pillarId: "relationships",
				title: "Écoute active - Les fondamentaux",
				description: "Apprenez les principes de l'écoute active pour améliorer vos relations professionnelles et personnelles.",
				completed: true,
				locked: false,
				completedAt: new Date("2024-09-06"),
				duration: 20,
				points: 50,
				steps: [
					"Maintenez un contact visuel avec votre interlocuteur",
					"Évitez d'interrompre",
					"Posez des questions de clarification",
					"Reformulez pour vérifier votre compréhension",
					"Montrez de l'empathie"
				]
			},
			{
				id: "rel-2",
				day: 13,
				week: 2,
				pillarId: "relationships",
				title: "Communication non-violente",
				description: "Découvrez la méthode de communication non-violente pour exprimer vos besoins sans jugement.",
				completed: false,
				locked: false,
				duration: 30,
				points: 50,
				steps: [
					"Observez les faits sans juger",
					"Identifiez et exprimez vos sentiments",
					"Clarifiez vos besoins",
					"Formulez une demande claire",
					"Pratiquez l'empathie envers l'autre"
				]
			}
		],
		resources: [
			{
				title: "Guide de la communication bienveillante",
				description: "Techniques pour améliorer vos interactions quotidiennes",
				icon: "💬",
				link: "#"
			},
			{
				title: "Exercices d'empathie",
				description: "Activités pratiques pour développer votre empathie",
				icon: "🤝",
				link: "#"
			}
		],
		tips: [
			"Pratiquez l'écoute active quotidiennement, même dans les petites conversations",
			"Exprimez régulièrement votre reconnaissance aux personnes importantes",
			"Soyez curieux et posez des questions ouvertes",
			"Respectez les limites des autres comme vous souhaitez que l'on respecte les vôtres",
			"Investissez du temps de qualité dans vos relations importantes"
		]
	},
	"creativity": {
		id: "creativity",
		name: "Créativité",
		description: "Innovation et expression personnelle",
		color: "bg-orange-500",
		icon: "🎨",
		progress: 9,
		completedDays: 5,
		totalDays: 52,
		gradient: "bg-linear-to-br from-orange-500 to-orange-700",
		pointsEarned: 250,
		tasks: [
			{
				id: "cr-1",
				day: 7,
				week: 1,
				pillarId: "creativity",
				title: "Journal créatif - Premier pas",
				description: "Commencez un journal créatif en combinant écriture, dessin et collage sans jugement.",
				completed: true,
				locked: false,
				completedAt: new Date("2024-09-07"),
				duration: 25,
				points: 50,
				steps: [
					"Choisissez un support (carnet, cahier, etc.)",
					"Rassemblez des matériaux (crayons, magazines, colle)",
					"Exprimez-vous librement sans autocensure",
					"Mélangez différentes techniques",
					"Ne recherchez pas la perfection"
				]
			},
			{
				id: "cr-2",
				day: 14,
				week: 2,
				pillarId: "creativity",
				title: "Brainstorming créatif",
				description: "Pratiquez la technique du brainstorming pour générer des idées innovantes sans limitation.",
				completed: false,
				locked: false,
				duration: 30,
				points: 50,
				steps: [
					"Choisissez un défi ou une question",
					"Réglez un timer sur 15 minutes",
					"Notez toutes les idées sans les juger",
					"Encouragez les idées farfelues",
					"Sélectionnez les 3 idées les plus intéressantes"
				]
			}
		],
		resources: [
			{
				title: "Exercices de créativité quotidiens",
				description: "Activités simples pour stimuler votre imagination",
				icon: "✨",
				link: "#"
			},
			{
				title: "Inspiration artistique",
				description: "Collection de ressources pour nourrir votre créativité",
				icon: "🎭",
				link: "#"
			}
		],
		tips: [
			"La créativité se cultive quotidiennement, même par de petits exercices",
			"Sortez de votre zone de confort et essayez de nouvelles activités",
			"Ne censurez pas vos idées, toutes ont de la valeur",
			"Observez le monde avec curiosité et émerveillement",
			"Connectez des idées apparemment sans rapport pour créer de l'innovation"
		]
	}
};

// Fonction pour récupérer les détails d'un pilier
export function getPillarDetails(pillarId: string): PillarDetail | null {
	return pillarDetailsData[pillarId] || null;
}
