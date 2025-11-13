"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Badge, UserStats } from "@/src/types/dashboard";
import { Award, Flame, Star, Trophy } from "lucide-react";

interface GamificationPanelProps {
	stats: UserStats;
	recentBadges: Badge[];
}

export function GamificationPanel({
	stats,
	recentBadges,
}: GamificationPanelProps) {
	const levelProgress = ((stats.points % 1000) / 1000) * 100;

	return (
		<div className="space-y-6">
			{/* Points et Niveau */}
			<Card className="bg-linear-to-br from-yellow-50 to-orange-50">
				<CardHeader>
					<CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
						<Trophy className="h-6 w-6 text-yellow-600" />
						Niveau et Points
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="space-y-4">
						<div className="flex items-center justify-between">
							<div>
								<div className="text-3xl font-bold text-gray-900">
									Niveau {stats.level}
								</div>
								<div className="text-sm text-gray-600">
									{stats.points} points
								</div>
							</div>
							<div className="w-20 h-20 rounded-full bg-yellow-100 flex items-center justify-center">
								<Star className="h-10 w-10 text-yellow-600 fill-yellow-600" />
							</div>
						</div>

						<div>
							<div className="flex items-center justify-between text-sm mb-2">
								<span className="text-gray-600">Progression</span>
								<span className="font-semibold text-gray-900">
									{stats.points % 1000}/1000 points
								</span>
							</div>
							<div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
								<div
									className="h-full rounded-full bg-yellow-500 transition-all duration-500"
									style={{ width: `${levelProgress}%` }}
								/>
							</div>
							<p className="text-xs text-gray-500 mt-2">
								{1000 - (stats.points % 1000)} points pour le niveau suivant
							</p>
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Streaks */}
			<Card className="bg-linear-to-br from-red-50 to-pink-50">
				<CardHeader>
					<CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
						<Flame className="h-6 w-6 text-red-600" />
						Série de Réussite
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="grid grid-cols-2 gap-4">
						<div className="text-center p-4 bg-white rounded-lg shadow-sm">
							<Flame className="h-8 w-8 text-red-500 mx-auto mb-2" />
							<div className="text-3xl font-bold text-gray-900">
								{stats.currentStreak}
							</div>
							<div className="text-xs text-gray-600">Jours consécutifs</div>
						</div>
						<div className="text-center p-4 bg-white rounded-lg shadow-sm">
							<Trophy className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
							<div className="text-3xl font-bold text-gray-900">
								{stats.longestStreak}
							</div>
							<div className="text-xs text-gray-600">Record personnel</div>
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Badges récents */}
			<Card>
				<CardHeader>
					<CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
						<Award className="h-6 w-6 text-primary-500" />
						Badges Récents
					</CardTitle>
				</CardHeader>
				<CardContent>
					{recentBadges.length > 0 ? (
						<div className="grid grid-cols-2 gap-3">
							{recentBadges.map((badge) => (
								<div
									key={badge.id}
									className={cn(
										"p-4 rounded-lg border-2 transition-all",
										badge.locked
											? "bg-gray-50 border-gray-200 opacity-50"
											: "bg-white border-primary-200 shadow-sm hover:shadow-md"
									)}
								>
									<div className="text-center">
										<div className="text-3xl mb-2">{badge.icon}</div>
										<div className="font-semibold text-sm text-gray-900">
											{badge.name}
										</div>
										<div className="text-xs text-gray-500 mt-1">
											{badge.description}
										</div>
										{badge.earnedAt && (
											<div className="text-xs text-primary-600 mt-2 font-medium">
												Débloqué le{" "}
												{new Date(badge.earnedAt).toLocaleDateString("fr-FR")}
											</div>
										)}
									</div>
								</div>
							))}
						</div>
					) : (
						<div className="text-center py-8 text-gray-500">
							<Award className="h-12 w-12 mx-auto mb-3 opacity-30" />
							<p>Aucun badge débloqué pour le moment</p>
							<p className="text-xs mt-1">Continuez votre parcours !</p>
						</div>
					)}
				</CardContent>
			</Card>
		</div>
	);
}
