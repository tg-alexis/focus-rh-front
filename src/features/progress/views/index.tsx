"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
	ProgressCircleSkeleton,
	StatsCardSkeleton,
	WeeklyCalendarSkeleton,
} from "@/features/dashboard/components/ui/dashboard-skeleton";
// import { ProgressCircle } from "@/features/dashboard/components/ui/progress-circle";
import { StatsCard } from "@/features/dashboard/components/ui/stats-card";
import { WeeklyCalendar } from "@/features/dashboard/components/ui/weekly-calendar";
import { Badge } from "@/types/dashboard";
import {
	Award,
	Calendar,
	Flame,
	Target,
	TrendingUp,
	Trophy,
} from "lucide-react";
import { useGetStatsDashboard } from "../api/get-progress";
import { ProgressCircle } from "../components/ui/progress-circle";

const ProgressView = () => {
	const { data: statsData, isLoading: isLoadingStats } = useGetStatsDashboard();

	return (
		<div className="max-w-7xl mx-auto">
			{/* Header */}
			<div className="mb-8">
				<h1 className="text-4xl font-bold text-gray-900 mb-2">
					Votre Progression
				</h1>
				<p className="text-gray-600">
					Suivez votre évolution et vos accomplissements tout au long du
					parcours
				</p>
			</div>

			{/* Cartes de statistiques principales */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
				{isLoadingStats ? (
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
							value={statsData?.stats.daysCompleted || 0}
							description={`sur ${statsData?.stats.totalDays || 0} jours`}
							icon={Calendar}
							color="text-primary-500"
						/>
						<StatsCard
							title="Taux de Réalisation"
							value={`${statsData?.stats.completionRate || 0}%`}
							description="de progression globale"
							icon={TrendingUp}
							color="text-green-600"
						/>
						<StatsCard
							title="Série Actuelle"
							value={statsData?.stats.currentStreak || 0}
							description="jours consécutifs"
							icon={Flame}
							color="text-orange-600"
						/>
						<StatsCard
							title="Points Totaux"
							value={statsData?.stats.totalPoints || 0}
							description={`Niveau ${statsData?.stats.currentLevel || 1}`}
							icon={Target}
							color="text-yellow-600"
						/>
					</>
				)}
			</div>

			{/* Layout principal */}
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
				{/* Colonne principale (2/3) */}
				<div className="lg:col-span-2 space-y-8">
					{/* Progression circulaire et piliers */}
					<div className="grid grid-cols-1 gap-6">
						{isLoadingStats ? (
							<>
								<ProgressCircleSkeleton />
							</>
						) : (
							<>
								<ProgressCircle stats={statsData?.levelProgress} />
								{/* <PillarProgress pillars={statsData?.pillarProgress || []} /> */}
							</>
						)}
					</div>

					{/* Calendrier des semaines */}
					{isLoadingStats ? (
						<WeeklyCalendarSkeleton />
					) : statsData?.calendar ? (
						<WeeklyCalendar
							weekProgress={statsData.calendar.weeks}
							currentWeek={statsData?.currentWeek || 1}
						/>
					) : null}
				</div>

				{/* Colonne latérale (1/3) */}
				<div className="lg:col-span-1 space-y-6">
					{/* Streak Card */}
					{isLoadingStats ? (
						<Card>
							<CardHeader>
								<Skeleton className="h-6 w-32" />
							</CardHeader>
							<CardContent>
								<Skeleton className="h-24 w-full" />
							</CardContent>
						</Card>
					) : (
						<Card className="bg-linear-to-br from-orange-50 to-red-50">
							<CardHeader>
								<CardTitle className="flex items-center gap-2">
									<Flame className="h-5 w-5 text-orange-600" />
									Série de Jours
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="space-y-4">
									<div className="text-center p-4 bg-white rounded-lg">
										<div className="text-4xl font-bold text-orange-600">
											{statsData?.stats.currentStreak || 0}
										</div>
										<div className="text-sm text-gray-600 mt-1">
											Jours consécutifs
										</div>
									</div>
									<div className="flex items-center justify-between text-sm">
										<span className="text-gray-600">Record personnel</span>
										<span className="font-bold text-gray-900">
											{statsData?.stats.longestStreak || 0} jours
										</span>
									</div>
								</div>
							</CardContent>
						</Card>
					)}

					{/* Badges récents */}
					{isLoadingStats ? (
						<Card>
							<CardHeader>
								<Skeleton className="h-6 w-32" />
							</CardHeader>
							<CardContent>
								<Skeleton className="h-32 w-full" />
							</CardContent>
						</Card>
					) : statsData?.recentBadges && statsData.recentBadges.length > 0 ? (
						<Card>
							<CardHeader>
								<CardTitle className="flex items-center gap-2">
									<Award className="h-5 w-5 text-yellow-600" />
									Badges Récents
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="space-y-3">
									{statsData.recentBadges.slice(0, 3).map((badge: Badge) => (
										<div
											key={badge.id}
											className="flex items-center gap-3 p-3 bg-linear-to-r from-yellow-50 to-orange-50 rounded-lg"
										>
											<div className="text-2xl">{badge.icon}</div>
											<div className="flex-1">
												<div className="font-semibold text-sm text-gray-900">
													{badge.name}
												</div>
												<div className="text-xs text-gray-600">
													{badge.description}
												</div>
											</div>
										</div>
									))}
								</div>
							</CardContent>
						</Card>
					) : null}

					{/* Niveau et Points */}
					{isLoadingStats ? (
						<Card>
							<CardHeader>
								<Skeleton className="h-6 w-32" />
							</CardHeader>
							<CardContent>
								<Skeleton className="h-24 w-full" />
							</CardContent>
						</Card>
					) : (
						<Card className="bg-linear-to-br from-purple-50 to-blue-50">
							<CardHeader>
								<CardTitle className="flex items-center gap-2">
									<Trophy className="h-5 w-5 text-purple-600" />
									Niveau & Points
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="space-y-4">
									<div className="text-center p-4 bg-white rounded-lg">
										<div className="text-sm text-gray-600 mb-1">
											Niveau Actuel
										</div>
										<div className="text-4xl font-bold text-purple-600">
											{statsData?.stats.currentLevel || 1}
										</div>
									</div>
									<div className="space-y-2">
										<div className="flex justify-between text-sm">
											<span className="text-gray-600">Progression</span>
											<span className="font-semibold text-gray-900">
												{statsData?.levelProgress?.pointsInCurrentLevel || 0} /{" "}
												{statsData?.levelProgress?.pointsToNextLevel || 0}
											</span>
										</div>
										<div className="w-full bg-gray-200 rounded-full h-2">
											<div
												className="bg-purple-600 h-full rounded-full transition-all duration-500"
												style={{
													width: `${Math.min(
														((statsData?.levelProgress.pointsInCurrentLevel ||
															0) /
															(statsData?.levelProgress.pointsToNextLevel ||
																1)) *
															100,
														100
													)}%`,
												}}
											/>
										</div>
										<div className="text-xs text-gray-500 text-center">
											{statsData?.levelProgress?.pointsToNextLevel -
												statsData?.levelProgress?.pointsInCurrentLevel ||
												0}{" "}
											points pour le niveau suivant
										</div>
									</div>
								</div>
							</CardContent>
						</Card>
					)}
				</div>
			</div>
		</div>
	);
};

export default ProgressView;
