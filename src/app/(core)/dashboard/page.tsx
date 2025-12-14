"use client";

import { GamificationPanel } from "@/components/dashboard/gamification-panel";
import { NextTaskCard } from "@/components/dashboard/next-task-card";
import { PillarProgress } from "@/components/dashboard/pillar-progress";
import { ProgressCircle } from "@/components/dashboard/progress-circle";
import { StatsCard } from "@/components/dashboard/stats-card";
import { WeeklyCalendar } from "@/components/dashboard/weekly-calendar";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Button } from "@/components/ui/button";
import { mockDashboardData } from "@/lib/mock-data";
// import { GamificationPanel } from "@/src/components/dashboard/gamification-panel";
// import { NextTaskCard } from "@/src/components/dashboard/next-task-card";
// import { PillarProgress } from "@/src/components/dashboard/pillar-progress";
// import { ProgressCircle } from "@/src/components/dashboard/progress-circle";
// import { StatsCard } from "@/src/components/dashboard/stats-card";
// import { WeeklyCalendar } from "@/src/components/dashboard/weekly-calendar";
// import { DashboardLayout } from "@/src/components/layout/dashboard-layout";
// import { mockDashboardData } from "@/src/lib/mock-data";
import { Calendar, Flame, Target, TrendingUp } from "lucide-react";

export default function Home() {
	const data = mockDashboardData;

	const handleStartTask = () => {
		console.log("Démarrage de la tâche:", data.nextTask?.title);
		// Navigation vers la page de la tâche
	};

	return (
		<DashboardLayout
			user={{
				name: data.user.name,
				level: data.stats.level,
			}}
		>
			<div className="max-w-7xl mx-auto">
				{/* Titre et message de bienvenue */}
				<div className="mb-8">
					<h1 className="text-4xl font-bold text-gray-900 mb-2">
						Bonjour, {data.user.name.split(" ")[0]} ! 👋
					</h1>
					<p className="text-gray-600">
						Vous êtes au jour {data.currentDay} de votre parcours bien-être.
						Continuez ainsi !
					</p>
				</div>

				{/* Cartes de statistiques principales */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
					<StatsCard
						title="Jours Complétés"
						value={data.stats.completedDays}
						description={`sur ${data.stats.totalDays} jours`}
						icon={Calendar}
						color="text-primary-500"
					/>
					<StatsCard
						title="Taux de Réalisation"
						value={`${data.stats.completionRate}%`}
						description="de progression globale"
						icon={TrendingUp}
						color="text-green-600"
						trend={{ value: 2.5, isPositive: true }}
					/>
					<StatsCard
						title="Série Actuelle"
						value={data.stats.currentStreak}
						description="jours consécutifs"
						icon={Flame}
						color="text-red-600"
					/>
					<StatsCard
						title="Points"
						value={data.stats.points}
						description={`Niveau ${data.stats.level}`}
						icon={Target}
						color="text-yellow-600"
					/>
				</div>

				{/* Layout principal en 2 colonnes */}
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					{/* Colonne principale (2/3) */}
					<div className="lg:col-span-2 space-y-8">
						{/* Prochaine tâche */}
						<NextTaskCard
							nextTask={data.nextTask}
							onStartTask={handleStartTask}
						/>

						{/* Progression circulaire et piliers */}
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<ProgressCircle stats={data.stats} />
							<PillarProgress pillars={data.pillars} />
						</div>

						{/* Calendrier des semaines */}
						<WeeklyCalendar
							weekProgress={data.weekProgress}
							currentWeek={data.currentWeek}
						/>
					</div>

					{/* Colonne latérale (1/3) */}
					<div className="lg:col-span-1">
						<GamificationPanel
							stats={data.stats}
							recentBadges={data.recentBadges}
						/>
					</div>
				</div>

				{/* Footer CTA */}
				<div className="mt-12 bg-linear-to-r from-primary-500 to-secondary-500 rounded-2xl p-8 text-white text-center shadow-lg">
					<h2 className="text-3xl font-bold mb-3">
						Prêt à continuer votre parcours ?
					</h2>
					<p className="mb-6 text-primary-50">
						Chaque jour est une opportunité de grandir et de vous épanouir.
					</p>
					<Button
						onClick={handleStartTask}
						size="lg"
						className="bg-white text-primary-600 hover:bg-gray-100 font-bold px-8"
					>
						Commencer la tâche du jour
					</Button>
				</div>
			</div>
		</DashboardLayout>
	);
}
