"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DashboardLayout } from "@/src/components/layout/dashboard-layout";
import {
	PillarHeader,
	PillarStats,
	TaskList,
	WeeklyProgress,
} from "@/src/components/pillars";
import { getPillarDetails, mockDashboardData } from "@/src/lib/mock-data";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

interface PillarPageProps {
	params: {
		pillar: string;
	};
}

export default function PillarPage({ params }: PillarPageProps) {
	const pillarDetails = getPillarDetails(params.pillar);

	if (!pillarDetails) {
		notFound();
	}

	const data = mockDashboardData;

	return (
		<DashboardLayout
			user={{
				name: data.user.name,
				level: data.stats.level,
			}}
		>
			<div className="max-w-7xl mx-auto space-y-6">
				{/* Breadcrumb */}
				<Link
					href="/pillars"
					className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-primary-600 transition-colors"
				>
					<ArrowLeft className="h-4 w-4" />
					Retour aux piliers
				</Link>

				{/* Header du pilier */}
				<PillarHeader pillar={pillarDetails} />

				{/* Statistiques du pilier */}
				<PillarStats pillar={pillarDetails} />

				{/* Tabs Navigation */}
				<Tabs defaultValue="tasks" className="space-y-6">
					<TabsList className="grid w-full grid-cols-3 lg:w-auto lg:inline-grid">
						<TabsTrigger value="tasks">Tâches</TabsTrigger>
						<TabsTrigger value="progress">Progression</TabsTrigger>
						<TabsTrigger value="resources">Ressources</TabsTrigger>
					</TabsList>

					{/* Onglet Tâches */}
					<TabsContent value="tasks" className="space-y-6">
						<TaskList
							tasks={pillarDetails.tasks}
							pillarColor={pillarDetails.color}
						/>
					</TabsContent>

					{/* Onglet Progression */}
					<TabsContent value="progress" className="space-y-6">
						<WeeklyProgress pillar={pillarDetails} />
					</TabsContent>

					{/* Onglet Ressources */}
					<TabsContent value="resources" className="space-y-6">
						<Card>
							<CardHeader>
								<CardTitle>Ressources et Conseils</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								{pillarDetails.resources.map((resource, index) => (
									<div
										key={index}
										className="p-4 border border-gray-200 rounded-lg hover:border-primary-300 transition-colors"
									>
										<div className="flex items-start gap-3">
											<div className="text-2xl">{resource.icon}</div>
											<div className="flex-1">
												<h3 className="font-semibold text-gray-900 mb-1">
													{resource.title}
												</h3>
												<p className="text-sm text-gray-600">
													{resource.description}
												</p>
												{resource.link && (
													<Link
														href={resource.link}
														className="text-sm text-primary-600 hover:text-primary-700 mt-2 inline-flex items-center gap-1"
													>
														En savoir plus →
													</Link>
												)}
											</div>
										</div>
									</div>
								))}
							</CardContent>
						</Card>

						{/* Conseils pratiques */}
						<Card className="bg-linear-to-br from-primary-50 to-secondary-50">
							<CardHeader>
								<CardTitle>💡 Conseils Pratiques</CardTitle>
							</CardHeader>
							<CardContent>
								<ul className="space-y-3">
									{pillarDetails.tips.map((tip, index) => (
										<li key={index} className="flex items-start gap-3">
											<span className="shrink-0 w-6 h-6 rounded-full bg-primary-500 text-white flex items-center justify-center text-xs font-bold">
												{index + 1}
											</span>
											<p className="text-sm text-gray-700 leading-relaxed">
												{tip}
											</p>
										</li>
									))}
								</ul>
							</CardContent>
						</Card>
					</TabsContent>
				</Tabs>

				{/* CTA Footer */}
				<Card className="border-primary-200 bg-linear-to-r from-white to-primary-50">
					<CardContent className="py-8">
						<div className="flex flex-col md:flex-row items-center justify-between gap-4">
							<div>
								<h3 className="text-xl font-bold text-gray-900 mb-1">
									Prêt à progresser ?
								</h3>
								<p className="text-gray-600">
									Commencez par votre prochaine tâche de ce pilier
								</p>
							</div>
							<Button
								size="lg"
								className="bg-primary-500 hover:bg-primary-600 text-white"
							>
								Démarrer la prochaine tâche
							</Button>
						</div>
					</CardContent>
				</Card>
			</div>
		</DashboardLayout>
	);
}
