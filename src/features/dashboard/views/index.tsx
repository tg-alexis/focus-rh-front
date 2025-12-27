"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
	GamificationPanelSkeleton,
	NextTaskCardSkeleton,
	PillarProgressSkeleton,
	ProgressCircleSkeleton,
	StatsCardSkeleton,
	WeeklyCalendarSkeleton,
} from "@/features/dashboard/components/ui/dashboard-skeleton";
import { GamificationPanel } from "@/features/dashboard/components/ui/gamification-panel";
import { NextTaskCard } from "@/features/dashboard/components/ui/next-task-card";
import { PillarProgress } from "@/features/dashboard/components/ui/pillar-progress";
import { ProgressCircle } from "@/features/dashboard/components/ui/progress-circle";
import { StatsCard } from "@/features/dashboard/components/ui/stats-card";
import { WeeklyCalendar } from "@/features/dashboard/components/ui/weekly-calendar";
import { Calendar, Flame, Target, TrendingUp } from "lucide-react";
import { useGetDashboardContent } from "../api/get-dashboard";

const DashboardView = ({
	handleStartTask,
}: {
	handleStartTask: () => void;
}) => {
	const { data: dashboardData, isLoading: dashboardLoading } =
		useGetDashboardContent();

	return (
		<>
			<div className="max-w-7xl mx-auto">
				{/* Titre et message de bienvenue */}
				<div className="mb-8">
					<h1 className="text-4xl font-bold text-gray-900 mb-2">
						{dashboardData?.greeting}
					</h1>
					{dashboardLoading ? (
						<Skeleton className="h-5 w-96" />
					) : (
						<p className="text-gray-600">
							{dashboardData?.progressMessage || "Chargement..."}
						</p>
					)}
				</div>

				{/* Cartes de statistiques principales */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
					{dashboardLoading ? (
						<>
							<StatsCardSkeleton />
							<StatsCardSkeleton />
							<StatsCardSkeleton />
							<StatsCardSkeleton />
						</>
					) : (
						<>
							<StatsCard
								title="Jours Complétés"
								value={dashboardData?.stats.daysCompleted || 0}
								description={`sur ${dashboardData?.stats.totalDays || 0} jours`}
								icon={Calendar}
								color="text-primary-500"
							/>
							<StatsCard
								title="Taux de Réalisation"
								value={`${dashboardData?.stats.completionRate || 0}%`}
								description="de progression globale"
								icon={TrendingUp}
								color="text-green-600"
							/>
							<StatsCard
								title="Série Actuelle"
								value={dashboardData?.stats.currentStreak || 0}
								description="jours consécutifs"
								icon={Flame}
								color="text-red-600"
							/>
							<StatsCard
								title="Points"
								value={dashboardData?.stats.totalPoints || 0}
								description={`Niveau ${dashboardData?.stats.currentLevel || 1}`}
								icon={Target}
								color="text-yellow-600"
							/>
						</>
					)}
				</div>

				{/* Layout principal en 2 colonnes */}
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					{/* Colonne principale (2/3) */}
					<div className="lg:col-span-2 space-y-8">
						{/* Prochaine tâche */}
						{dashboardLoading ? (
							<NextTaskCardSkeleton />
						) : (
							<NextTaskCard
								nextTask={dashboardData?.nextTask}
								onStartTask={handleStartTask}
							/>
						)}

						{/* Progression circulaire et piliers */}
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							{dashboardLoading ? (
								<>
									<ProgressCircleSkeleton />
									<PillarProgressSkeleton />
								</>
							) : dashboardData?.levelProgress ? (
								<>
									<ProgressCircle stats={dashboardData.levelProgress} />
									<PillarProgress
										pillars={dashboardData?.pillarProgress || []}
									/>
								</>
							) : null}
						</div>

						{/* Calendrier des semaines */}
						{dashboardLoading ? (
							<WeeklyCalendarSkeleton />
						) : dashboardData?.calendar ? (
							<WeeklyCalendar
								weekProgress={dashboardData.calendar.weeks}
								currentWeek={dashboardData?.currentWeek || 1}
							/>
						) : null}
					</div>

					{/* Colonne latérale (1/3) */}
					<div className="lg:col-span-1">
						{dashboardLoading ? (
							<GamificationPanelSkeleton />
						) : dashboardData?.stats ? (
							<GamificationPanel
								stats={dashboardData.stats}
								recentBadges={dashboardData?.recentBadges || []}
								streak={dashboardData?.streak}
							/>
						) : null}
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
						className="bg-white text-gray-600 hover:bg-gray-100 font-bold px-8"
					>
						Commencer la tâche du jour
					</Button>
				</div>
			</div>
		</>
	);
};

export default DashboardView;
