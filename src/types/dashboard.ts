// Types pour le Dashboard du Carnet Bien-être

export interface Pillar {
	id: string;
	name: string;
	description: string;
	color: string;
	icon: string;
	completionPercentage: number; // 0-100
	daysCompleted: number;
	totalDays: number;
}

export interface DailyTask {
	id: string;
	day: number;
	week: number;
	pillarId: string;
	title: string;
	description: string;
	completed: boolean;
	locked: boolean;
	completedAt?: Date;
}

export interface WeekProgress {
	weekNumber: number;
	startDate: Date;
	pillarCompletion: number;
	endDate: Date;
	daysCompleted: number;
	totalDays: number;
}

export interface Badge {
	id: string;
	name: string;
	description: string;
	icon: string;
	earnedAt?: Date;
	locked: boolean;
	category: 'streak' | 'completion' | 'pillar' | 'special';
}

export interface UserStats {
	totalPoints: number;
	progressPercentage: number;
	pointsInCurrentLevel: number;
	pointsToNextLevel: number;
	totalDays: number;
	completedDays: number;
	currentStreak: number;
	longestStreak: number;
	completionRate: number; // 0-100

	currentLevel: number;
	startDate: Date;
	lastActivityDate?: Date;
}

export interface StreakData {
	current: number;
	longest: number;
	isActive: boolean;
}

export interface DashboardData {
	user: {
		id: string;
		name: string;
		avatar?: string;
	};
	stats: UserStats;
	pillars: Pillar[];
	weekProgress: WeekProgress[];
	currentWeek: number;
	currentDay: number;
	nextTask?: DailyTask;
	recentBadges: Badge[];
	allBadges: Badge[];
}

export type PillarType = 
	| 'mental-health'
	| 'work-life-balance'
	| 'physical-wellness'
	| 'personal-growth'
	| 'relationships'
	| 'creativity';

export interface PillarTask {
	id: string;
	day: number;
	week: number;
	pillarId: string;
	title: string;
	description: string;
	completed: boolean;
	locked: boolean;
	completedAt?: Date;
	duration?: number; // minutes
	steps?: string[];
	points?: number;
}

export interface PillarResource {
	title: string;
	description: string;
	icon: string;
	link?: string;
}

export interface PillarDetail extends Pillar {
	gradient: string; // Classe CSS pour le gradient
	tasks: PillarTask[];
	resources: PillarResource[];
	tips: string[];
	pointsEarned?: number;
}
