"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

import { Pillar } from "@/types/dashboard";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useGetPillarsDashboard } from "../api/get-pillars";

const PillarsView = () => {
	const { data: pillarsData, isLoading: isLoadingPillars } =
		useGetPillarsDashboard();

	return (
		<div>
			<div className="max-w-6xl mx-auto space-y-6">
				{/* Header */}
				<div>
					{isLoadingPillars ? (
						<Skeleton className="w-full lg:w-48 h-6 rounded-lg" />
					) : (
						<>
							<h1 className="text-3xl font-bold text-gray-900 mb-2">
								Les {pillarsData?.length} Piliers du Bien-être
							</h1>
							<p className="text-gray-600">
								Découvrez les différents aspects de votre parcours de
								transformation
							</p>
						</>
					)}
				</div>

				{/* Grid des piliers */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{isLoadingPillars ? (
						<>
							{[...Array(6)].map((_, index) => (
								<Card key={index}>
									<CardHeader>
										<div className="flex items-center gap-3 mb-3">
											<Skeleton className="w-12 h-12 rounded-lg" />
											<div className="flex-1">
												<Skeleton className="h-6 w-32" />
											</div>
											<Skeleton className="h-5 w-5 rounded" />
										</div>
										<Skeleton className="h-4 w-full" />
										<Skeleton className="h-4 w-3/4 mt-2" />
									</CardHeader>
									<CardContent>
										<div className="mb-4">
											<div className="flex justify-between text-sm mb-2">
												<Skeleton className="h-4 w-20" />
												<Skeleton className="h-4 w-12" />
											</div>
											<Skeleton className="w-full h-2 rounded-full" />
											<Skeleton className="h-3 w-24 mt-1" />
										</div>
										<Skeleton className="w-full h-10 rounded-md" />
									</CardContent>
								</Card>
							))}
						</>
					) : (
						pillarsData?.map((pillar: Pillar) => {
							return (
								<Card
									key={pillar.id}
									className="hover:shadow-lg transition-all cursor-pointer group"
								>
									<CardHeader>
										<div className="flex items-start gap-2 mb-3">
											<div
												style={{
													backgroundColor: pillar.color,
												}}
												className="w-4 h-4 rounded-lg flex items-center justify-center text-white text-2xl mt-1"
											>
												{/* {pillar.icon} */}
											</div>
											<div className="flex-1">
												<CardTitle className="text-md  line-clamp-2">
													{pillar.name}
												</CardTitle>
											</div>
											{/* <IconComponent className="h-5 w-5 text-gray-400 group-hover:text-primary-500 transition-colors" /> */}
										</div>
										<p className="text-sm text-gray-600">
											{pillar.description}
										</p>
									</CardHeader>
									<CardContent>
										{/* Progress bar */}
										<div className="mb-4">
											<div className="flex justify-between text-sm mb-1">
												<span className="text-gray-600">Progression</span>
												<span className="font-semibold text-gray-900">
													{pillar.completionPercentage}%
												</span>
											</div>
											<div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
												<div
													className={`h-full rounded-full transition-all duration-500 ${pillar.color}`}
													style={{
														width: `${pillar.completionPercentage}%`,
														backgroundColor: pillar.color,
													}}
												/>
											</div>
											<div className="text-xs text-gray-500 mt-1">
												{pillar.daysCompleted} / {pillar.totalDays} jours
												complétés
											</div>
										</div>

										{/* CTA */}
										<Link href={`/pillars/${pillar.id}`}>
											<Button
												variant="outline"
												className="w-full group-hover:bg-primary-50 group-hover:border-primary-500 group-hover:text-primary-700 transition-colors"
											>
												Explorer ce pilier
												<ArrowRight className="ml-2 h-4 w-4" />
											</Button>
										</Link>
									</CardContent>
								</Card>
							);
						})
					)}
				</div>

				{/* Stats globales */}
				{/* <Card className="bg-linear-to-br from-primary-50 to-secondary-50">
					<CardHeader>
						<CardTitle>Statistiques Globales</CardTitle>
					</CardHeader>
					<CardContent>
						{isLoadingPillars ? (
							<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
								{[...Array(4)].map((_, index) => (
									<div
										key={index}
										className="text-center p-4 bg-white rounded-lg"
									>
										<Skeleton className="h-9 w-16 mx-auto" />
										<Skeleton className="h-4 w-24 mx-auto mt-2" />
									</div>
								))}
							</div>
						) : (
							<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
								<div className="text-center p-4 bg-white rounded-lg">
									<div className="text-3xl font-bold text-primary-600">
										{pillarsData?.length || 0}
									</div>
									<div className="text-sm text-gray-600 mt-1">
										Piliers actifs
									</div>
								</div>
								<div className="text-center p-4 bg-white rounded-lg">
									<div className="text-3xl font-bold text-blue-600">
										{pillarsData?.reduce(
											(acc, p) => acc + p.completedDays,
											0
										) || 0}
									</div>
									<div className="text-sm text-gray-600 mt-1">
										Jours totaux complétés
									</div>
								</div>
								<div className="text-center p-4 bg-white rounded-lg">
									<div className="text-3xl font-bold text-green-600">
										{pillarsData && pillarsData.length > 0
											? Math.round(
													pillarsData.reduce((acc, p) => acc + p.progress, 0) /
														pillarsData.length
											  )
											: 0}
										%
									</div>
									<div className="text-sm text-gray-600 mt-1">
										Moyenne de progression
									</div>
								</div>
								<div className="text-center p-4 bg-white rounded-lg">
									<div className="text-3xl font-bold text-yellow-600">
										{pillarsData?.filter((p) => p.progress >= 10).length || 0}
									</div>
									<div className="text-sm text-gray-600 mt-1">
										Piliers en bonne voie
									</div>
								</div>
							</div>
						)}
					</CardContent>
				</Card> */}

				{/* Info box */}
				<Card className="border-primary-200 bg-primary-50/50">
					<CardContent className="py-6">
						<div className="flex gap-4">
							<div className="text-4xl">💡</div>
							<div>
								<h3 className="font-bold text-gray-900 mb-2">
									Comment fonctionnent les piliers ?
								</h3>
								<p className="text-gray-700 text-sm leading-relaxed">
									Chaque semaine du parcours est associée à un pilier principal,
									mais vous travaillerez sur tous les piliers au cours des 52
									semaines. Cette approche holistique garantit un développement
									équilibré de tous les aspects de votre bien-être.
								</p>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

export default PillarsView;
