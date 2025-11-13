"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardLayout } from "@/src/components/layout/dashboard-layout";
import { mockDashboardData } from "@/src/lib/mock-data";
import { ArrowRight, Brain, Heart, Sparkles, Users } from "lucide-react";
import Link from "next/link";

const pillarIcons: { [key: string]: React.ElementType } = {
	"mental-health": Brain,
	"work-life-balance": Heart,
	"physical-wellness": Sparkles,
	"personal-growth": Users,
};

export default function PillarsPage() {
	const data = mockDashboardData;

	return (
		<DashboardLayout
			user={{
				name: data.user.name,
				level: data.stats.level,
			}}
		>
			<div className="max-w-6xl mx-auto space-y-6">
				{/* Header */}
				<div>
					<h1 className="text-3xl font-bold text-gray-900 mb-2">
						Les 6 Piliers du Bien-être
					</h1>
					<p className="text-gray-600">
						Découvrez les différents aspects de votre parcours de transformation
					</p>
				</div>

				{/* Grid des piliers */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{data.pillars.map((pillar) => {
						const IconComponent = pillarIcons[pillar.id] || Brain;

						return (
							<Card
								key={pillar.id}
								className="hover:shadow-lg transition-all cursor-pointer group"
							>
								<CardHeader>
									<div className="flex items-center gap-3 mb-3">
										<div
											className={`w-12 h-12 rounded-lg ${pillar.color} flex items-center justify-center text-white text-2xl`}
										>
											{pillar.icon}
										</div>
										<div className="flex-1">
											<CardTitle className="text-lg">{pillar.name}</CardTitle>
										</div>
										<IconComponent className="h-5 w-5 text-gray-400 group-hover:text-primary-500 transition-colors" />
									</div>
									<p className="text-sm text-gray-600">{pillar.description}</p>
								</CardHeader>
								<CardContent>
									{/* Progress bar */}
									<div className="mb-4">
										<div className="flex justify-between text-sm mb-2">
											<span className="text-gray-600">Progression</span>
											<span className="font-semibold text-gray-900">
												{pillar.progress}%
											</span>
										</div>
										<div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
											<div
												className={`h-full rounded-full transition-all duration-500 ${pillar.color}`}
												style={{ width: `${pillar.progress}%` }}
											/>
										</div>
										<div className="text-xs text-gray-500 mt-1">
											{pillar.completedDays} / {pillar.totalDays} jours
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
					})}
				</div>

				{/* Stats globales */}
				<Card className="bg-linear-to-br from-primary-50 to-secondary-50">
					<CardHeader>
						<CardTitle>Statistiques Globales</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
							<div className="text-center p-4 bg-white rounded-lg">
								<div className="text-3xl font-bold text-primary-600">
									{data.pillars.length}
								</div>
								<div className="text-sm text-gray-600 mt-1">Piliers actifs</div>
							</div>
							<div className="text-center p-4 bg-white rounded-lg">
								<div className="text-3xl font-bold text-blue-600">
									{data.pillars.reduce((acc, p) => acc + p.completedDays, 0)}
								</div>
								<div className="text-sm text-gray-600 mt-1">
									Jours totaux complétés
								</div>
							</div>
							<div className="text-center p-4 bg-white rounded-lg">
								<div className="text-3xl font-bold text-green-600">
									{Math.round(
										data.pillars.reduce((acc, p) => acc + p.progress, 0) /
											data.pillars.length
									)}
									%
								</div>
								<div className="text-sm text-gray-600 mt-1">
									Moyenne de progression
								</div>
							</div>
							<div className="text-center p-4 bg-white rounded-lg">
								<div className="text-3xl font-bold text-yellow-600">
									{data.pillars.filter((p) => p.progress >= 10).length}
								</div>
								<div className="text-sm text-gray-600 mt-1">
									Piliers en bonne voie
								</div>
							</div>
						</div>
					</CardContent>
				</Card>

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
		</DashboardLayout>
	);
}
