"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils/utils";
import { PillarDetail } from "@/types/dashboard";
import { Calendar, CheckCircle2, Circle, Lock } from "lucide-react";

interface WeeklyProgressProps {
	pillar: PillarDetail;
}

export function WeeklyProgress({ pillar }: WeeklyProgressProps) {
	// Simuler les semaines (à remplacer par des données réelles)
	const weeks = Array.from(
		{ length: Math.ceil(pillar.totalDays / 7) },
		(_, i) => {
			const weekNumber = i + 1;
			const startDay = i * 7 + 1;
			const endDay = Math.min((i + 1) * 7, pillar.totalDays);
			const daysInWeek = endDay - startDay + 1;
			const completedInWeek =
				pillar.tasks?.filter((t) => t.week === weekNumber && t.completed)
					.length || 0;

			return {
				weekNumber,
				startDay,
				endDay,
				daysInWeek,
				completedDays: completedInWeek,
				progress: Math.round((completedInWeek / daysInWeek) * 100),
				isCompleted: completedInWeek === daysInWeek,
				isLocked: startDay > pillar.completedDays + 1,
			};
		}
	);

	return (
		<div className="space-y-6">
			{/* Vue d'ensemble */}
			<Card className="bg-linear-to-br from-primary-50 to-secondary-50">
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<Calendar className="h-5 w-5" />
						Progression Hebdomadaire
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
						<div className="text-center">
							<div className="text-3xl font-bold text-gray-900">
								{weeks.filter((w) => w.isCompleted).length}
							</div>
							<div className="text-sm text-gray-600 mt-1">
								Semaines complétées
							</div>
						</div>
						<div className="text-center">
							<div className="text-3xl font-bold text-primary-600">
								{weeks.filter((w) => !w.isLocked && !w.isCompleted).length}
							</div>
							<div className="text-sm text-gray-600 mt-1">En cours</div>
						</div>
						<div className="text-center">
							<div className="text-3xl font-bold text-gray-400">
								{weeks.filter((w) => w.isLocked).length}
							</div>
							<div className="text-sm text-gray-600 mt-1">À venir</div>
						</div>
						<div className="text-center">
							<div className="text-3xl font-bold text-blue-600">
								{Math.round(
									(weeks.filter((w) => w.isCompleted).length / weeks.length) *
										100
								)}
								%
							</div>
							<div className="text-sm text-gray-600 mt-1">Progression</div>
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Liste des semaines */}
			<div className="grid gap-4">
				{weeks.map((week) => (
					<Card
						key={week.weekNumber}
						className={cn(
							"transition-all hover:shadow-md",
							week.isCompleted && "border-green-200 bg-green-50/50",
							week.isLocked && "opacity-50"
						)}
					>
						<CardContent className="p-4">
							<div className="flex items-center gap-4">
								{/* Icône de statut */}
								<div className="shrink-0">
									{week.isLocked ? (
										<div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
											<Lock className="h-5 w-5 text-gray-500" />
										</div>
									) : week.isCompleted ? (
										<div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
											<CheckCircle2 className="h-6 w-6 text-white" />
										</div>
									) : (
										<div
											className={cn(
												"w-12 h-12 rounded-full flex items-center justify-center",
												pillar.color
											)}
										>
											<Circle className="h-6 w-6 text-white" />
										</div>
									)}
								</div>

								{/* Informations */}
								<div className="flex-1 min-w-0">
									<div className="flex items-center gap-2 mb-1">
										<h3 className="font-semibold text-gray-900">
											Semaine {week.weekNumber}
										</h3>
										{week.isCompleted && (
											<span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full font-medium">
												Terminée
											</span>
										)}
										{week.isLocked && (
											<span className="px-2 py-0.5 bg-gray-200 text-gray-600 text-xs rounded-full font-medium">
												Verrouillée
											</span>
										)}
									</div>
									<p className="text-sm text-gray-600">
										Jours {week.startDay} à {week.endDay} • {week.completedDays}
										/{week.daysInWeek} complétés
									</p>
								</div>

								{/* Barre de progression */}
								<div className="hidden md:block w-48 shrink-0">
									<div className="flex items-center gap-2">
										<div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
											<div
												className={cn(
													"h-full rounded-full transition-all",
													week.isCompleted
														? "bg-green-500"
														: week.isLocked
														? "bg-gray-400"
														: pillar.color
												)}
												style={{ width: `${week.progress}%` }}
											/>
										</div>
										<span className="text-sm font-semibold text-gray-700 w-12 text-right">
											{week.progress}%
										</span>
									</div>
								</div>
							</div>

							{/* Barre mobile */}
							<div className="md:hidden mt-3">
								<div className="flex items-center gap-2">
									<div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
										<div
											className={cn(
												"h-full rounded-full transition-all",
												week.isCompleted
													? "bg-green-500"
													: week.isLocked
													? "bg-gray-400"
													: pillar.color
											)}
											style={{ width: `${week.progress}%` }}
										/>
									</div>
									<span className="text-sm font-semibold text-gray-700">
										{week.progress}%
									</span>
								</div>
							</div>
						</CardContent>
					</Card>
				))}
			</div>
		</div>
	);
}
