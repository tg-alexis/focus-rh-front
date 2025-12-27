"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils/utils";
import { WeekProgress } from "@/types/dashboard";
import { Calendar, Check, Lock } from "lucide-react";

interface WeeklyCalendarProps {
	weekProgress: WeekProgress[];
	currentWeek: number;
}

export function WeeklyCalendar({
	weekProgress,
	currentWeek,
}: WeeklyCalendarProps) {
	const getWeekStatus = (week: WeekProgress, isCurrentWeek: boolean) => {
		const completionRate = (week.daysCompleted / week.totalDays) * 100;

		if (week.weekNumber > currentWeek) {
			return { status: "locked", color: "bg-gray-200", icon: Lock };
		}

		if (isCurrentWeek) {
			return { status: "current", color: "bg-blue-500", icon: Calendar };
		}

		if (completionRate === 100) {
			return { status: "completed", color: "bg-green-500", icon: Check };
		}

		if (completionRate >= 50) {
			return { status: "in-progress-good", color: "bg-yellow-500", icon: null };
		}

		return { status: "in-progress-low", color: "bg-orange-500", icon: null };
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
					<Calendar className="h-6 w-6 text-primary-500" />
					Calendrier des 52 Semaines
				</CardTitle>
				<p className="text-sm text-gray-600 mt-2">
					Vue d&apos;ensemble de votre progression sur l&apos;année
				</p>
			</CardHeader>
			<CardContent>
				<div className="space-y-6">
					{/* Légende */}
					<div className="flex flex-wrap gap-4 text-xs">
						<div className="flex items-center gap-2">
							<div className="w-4 h-4 rounded bg-green-500" />
							<span>Complétée</span>
						</div>
						<div className="flex items-center gap-2">
							<div className="w-4 h-4 rounded bg-blue-500" />
							<span>En cours</span>
						</div>
						<div className="flex items-center gap-2">
							<div className="w-4 h-4 rounded bg-yellow-500" />
							<span>Progression &gt; 50%</span>
						</div>
						<div className="flex items-center gap-2">
							<div className="w-4 h-4 rounded bg-orange-500" />
							<span>Progression &lt; 50%</span>
						</div>
						<div className="flex items-center gap-2">
							<div className="w-4 h-4 rounded bg-gray-200" />
							<span>Verrouillée</span>
						</div>
					</div>

					{/* Grille des semaines */}
					<div className="grid grid-cols-13 gap-2">
						{weekProgress.map((week) => {
							const isCurrentWeek = week.weekNumber === currentWeek;
							const { color, icon: Icon } = getWeekStatus(week, isCurrentWeek);
							const completionRate =
								(week.daysCompleted / week.totalDays) * 100;

							return (
								<div
									key={week.weekNumber}
									className={cn(
										"group relative aspect-square rounded-lg transition-all cursor-pointer",
										"hover:scale-110 hover:z-10 hover:shadow-lg",
										color,
										isCurrentWeek && "ring-4 ring-secondary-500 ring-offset-2"
									)}
								>
									<div className="absolute inset-0 flex flex-col items-center justify-center text-white">
										{Icon && <Icon className="h-4 w-4 mb-1" />}
										<span className="text-xs font-bold">
											S{week.weekNumber}
										</span>
									</div>

									{/* Tooltip au survol */}
									<div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50!">
										<div className="bg-gray-900 text-white text-xs rounded-lg p-3 whitespace-nowrap shadow-xl">
											<div className="font-bold mb-1">
												Semaine {week.weekNumber}
											</div>
											<div className="text-gray-300">
												{new Date(week.startDate).toLocaleDateString("fr-FR", {
													day: "numeric",
													month: "short",
												})}{" "}
												-{" "}
												{new Date(week.endDate).toLocaleDateString("fr-FR", {
													day: "numeric",
													month: "short",
												})}
											</div>
											<div className="mt-1">
												Pilier:{" "}
												<span className="font-semibold">
													{week.pillarCompletion !== undefined
														? `${week.pillarCompletion}%`
														: "-"}
												</span>
											</div>
											<div className="mt-1">
												Progression:{" "}
												<span className="font-semibold">
													{completionRate.toFixed(0)}%
												</span>
											</div>
											<div className="text-gray-300">
												{week.daysCompleted}/{week.totalDays} jours
											</div>
											<div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
										</div>
									</div>
								</div>
							);
						})}
					</div>

					{/* Statistiques globales */}
					<div className="grid grid-cols-3 gap-4 pt-4 border-t">
						<div className="text-center">
							<div className="text-2xl font-bold text-green-600">
								{
									weekProgress.filter(
										(w) =>
											w.daysCompleted === w.totalDays &&
											w.weekNumber <= currentWeek
									).length
								}
							</div>
							<div className="text-xs text-gray-600">Semaines complètes</div>
						</div>
						<div className="text-center">
							<div className="text-2xl font-bold text-blue-600">
								{currentWeek}
							</div>
							<div className="text-xs text-gray-600">Semaine actuelle</div>
						</div>
						<div className="text-center">
							<div className="text-2xl font-bold text-gray-600">
								{52 - currentWeek}
							</div>
							<div className="text-xs text-gray-600">Semaines restantes</div>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
