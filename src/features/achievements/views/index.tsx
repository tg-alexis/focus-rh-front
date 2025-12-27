"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils/utils";
import { Badge } from "@/types/dashboard";
import { Award, Lock, Sparkles, Trophy } from "lucide-react";
import { useState } from "react";
import { useGetAchievementsDashboard } from "../api/get-achievements";

const AchievementsView = () => {
	const { data: achievementsData, isLoading: isLoadingAchievements } =
		useGetAchievementsDashboard();

	const [selectedCategory, setSelectedCategory] = useState<string>("all");

	const categories = [
		{ value: "all", label: "Tous", icon: Trophy },
		{ value: "streak", label: "Séries", icon: Award },
		{ value: "completion", label: "Complétion", icon: Sparkles },
		{ value: "pillar", label: "Piliers", icon: Trophy },
		{ value: "special", label: "Spéciaux", icon: Award },
	];

	const filteredBadges =
		selectedCategory === "all"
			? achievementsData?.badges
			: achievementsData?.badges?.filter(
					(badge: Badge) => badge.category === selectedCategory
			  );

	const earnedCount =
		achievementsData?.badges?.filter((badge: Badge) => !badge.locked).length ||
		0;
	const totalCount = achievementsData?.badges?.length || 0;
	const completionPercentage =
		totalCount > 0 ? Math.round((earnedCount / totalCount) * 100) : 0;

	return (
		<div className="max-w-7xl mx-auto">
			{/* Header */}
			<div className="mb-8">
				<h1 className="text-4xl font-bold text-gray-900 mb-2">
					Réalisations & Badges
				</h1>
				<p className="text-gray-600">
					Débloquez des badges en accomplissant des défis et en progressant dans
					votre parcours
				</p>
			</div>

			{/* Stats globales */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
				{isLoadingAchievements ? (
					<>
						<Card>
							<CardContent className="pt-6">
								<Skeleton className="h-16 w-full" />
							</CardContent>
						</Card>
						<Card>
							<CardContent className="pt-6">
								<Skeleton className="h-16 w-full" />
							</CardContent>
						</Card>
						<Card>
							<CardContent className="pt-6">
								<Skeleton className="h-16 w-full" />
							</CardContent>
						</Card>
					</>
				) : (
					<>
						<Card className="bg-linear-to-br from-yellow-50 to-orange-50 w-full">
							<CardContent className="pt-6">
								<div className="flex items-center justify-between">
									<div>
										<div className="text-3xl font-bold text-gray-900">
											{earnedCount}
										</div>
										<div className="text-sm text-gray-600">
											Badges débloqués
										</div>
									</div>
									<Trophy className="h-8 w-8 text-yellow-600" />
								</div>
							</CardContent>
						</Card>

						<Card className="bg-linear-to-br from-blue-50 to-purple-50">
							<CardContent className="pt-6">
								<div className="flex items-center justify-between">
									<div>
										<div className="text-3xl font-bold text-gray-900">
											{totalCount - earnedCount}
										</div>
										<div className="text-sm text-gray-600">À débloquer</div>
									</div>
									<Lock className="h-8 w-8 text-blue-600" />
								</div>
							</CardContent>
						</Card>

						<Card className="bg-linear-to-br from-green-50 to-teal-50">
							<CardContent className="pt-6">
								<div className="space-y-2">
									<div className="flex items-center justify-between">
										<div className="text-sm text-gray-600">Progression</div>
										<div className="text-2xl font-bold text-gray-900">
											{completionPercentage}%
										</div>
									</div>
									<div className="w-full bg-gray-200 rounded-full h-3">
										<div
											className="bg-green-600 h-full rounded-full transition-all duration-500"
											style={{ width: `${completionPercentage}%` }}
										/>
									</div>
									<div className="text-xs text-gray-500">
										{earnedCount} / {totalCount} badges
									</div>
								</div>
							</CardContent>
						</Card>
					</>
				)}
			</div>

			{/* Tabs et grille de badges */}
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<Award className="h-6 w-6 text-primary-500" />
						Collection de Badges
					</CardTitle>
				</CardHeader>
				<CardContent>
					<Tabs defaultValue="all" className="w-full">
						<TabsList className="mb-6">
							{categories.map((category) => {
								const Icon = category.icon;
								const count =
									category.value === "all"
										? achievementsData?.badges?.length || 0
										: achievementsData?.badges?.filter(
												(badge: Badge) => badge.category === category.value
										  ).length || 0;

								return (
									<TabsTrigger
										key={category.value}
										value={category.value}
										onClick={() => setSelectedCategory(category.value)}
									>
										<Icon className="h-4 w-4" />
										{category.label}
										<span className="ml-1 text-xs opacity-60">({count})</span>
									</TabsTrigger>
								);
							})}
						</TabsList>

						{categories.map((category) => (
							<TabsContent key={category.value} value={category.value}>
								{isLoadingAchievements ? (
									<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
										{[...Array(8)].map((_, index) => (
											<Card key={index}>
												<CardContent className="pt-6">
													<div className="flex flex-col items-center space-y-3">
														<Skeleton className="h-16 w-16 rounded-full" />
														<Skeleton className="h-5 w-32" />
														<Skeleton className="h-4 w-full" />
														<Skeleton className="h-4 w-24" />
													</div>
												</CardContent>
											</Card>
										))}
									</div>
								) : filteredBadges && filteredBadges.length > 0 ? (
									<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
										{filteredBadges.map((badge: Badge) => (
											<Card
												key={badge.id}
												className={cn(
													"transition-all hover:shadow-lg",
													badge.locked
														? "bg-gray-50 opacity-60"
														: "bg-linear-to-br from-white to-primary-50/30 border-primary-200"
												)}
											>
												<CardContent className="pt-6">
													<div className="flex flex-col items-center text-center space-y-3">
														{/* Icône du badge */}
														<div
															className={cn(
																"relative w-20 h-20 rounded-full flex items-center justify-center text-4xl",
																badge.locked
																	? "bg-gray-200"
																	: "bg-linear-to-br from-yellow-100 to-orange-100 shadow-md"
															)}
														>
															{badge.locked ? (
																<Lock className="h-8 w-8 text-gray-400" />
															) : (
																<span>{badge.icon}</span>
															)}
														</div>

														{/* Nom du badge */}
														<div>
															<h3
																className={cn(
																	"font-bold text-base",
																	badge.locked
																		? "text-gray-500"
																		: "text-gray-900"
																)}
															>
																{badge.name}
															</h3>
															<p
																className={cn(
																	"text-xs mt-1",
																	badge.locked
																		? "text-gray-400"
																		: "text-gray-600"
																)}
															>
																{badge.description}
															</p>
														</div>

														{/* Date de déblocage */}
														{!badge.locked && badge.earnedAt && (
															<div className="text-xs text-primary-600 font-medium bg-primary-50 px-3 py-1 rounded-full">
																Débloqué le{" "}
																{new Date(badge.earnedAt).toLocaleDateString(
																	"fr-FR"
																)}
															</div>
														)}

														{badge.locked && (
															<div className="text-xs text-gray-500 font-medium bg-gray-100 px-3 py-1 rounded-full">
																Verrouillé
															</div>
														)}
													</div>
												</CardContent>
											</Card>
										))}
									</div>
								) : (
									<div className="text-center py-12 text-gray-500">
										<Award className="h-16 w-16 mx-auto mb-4 opacity-30" />
										<p className="text-lg font-medium">
											Aucun badge dans cette catégorie
										</p>
										<p className="text-sm mt-1">
											Continuez votre parcours pour débloquer des badges !
										</p>
									</div>
								)}
							</TabsContent>
						))}
					</Tabs>
				</CardContent>
			</Card>
		</div>
	);
};

export default AchievementsView;
