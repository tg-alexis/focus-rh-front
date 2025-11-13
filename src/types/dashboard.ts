// Types pour le Dashboard du Carnet Bien-être

export interface Pillar {
	id: string;
	name: string;
	description: string;
	color: string;
	icon: string;
	progress: number; // 0-100
	completedDays: number;
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
	endDate: Date;
	completedDays: number;
	totalDays: number;
	mainPillar: string;
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
	totalDays: number;
	completedDays: number;
	currentStreak: number;
	longestStreak: number;
	completionRate: number; // 0-100
	points: number;
	level: number;
	startDate: Date;
	lastActivityDate?: Date;
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
