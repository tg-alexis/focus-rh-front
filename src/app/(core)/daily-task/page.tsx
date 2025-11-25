"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardLayout } from "@/src/components/layout/dashboard-layout";
import { mockDashboardData } from "@/src/lib/mock-data";
import { ArrowRight, Calendar, CheckCircle2, Clock, Lock } from "lucide-react";

export default function DailyTaskPage() {
	const data = mockDashboardData;
	const task = data.nextTask;

	if (!task) {
		return (
			<DashboardLayout
				user={{
					name: data.user.name,
					level: data.stats.level,
				}}
			>
				<div className="max-w-4xl mx-auto">
					<Card>
						<CardContent className="py-12 text-center">
							<CheckCircle2 className="h-16 w-16 text-green-600 mx-auto mb-4" />
							<h2 className="text-2xl font-bold text-gray-900 mb-2">
								Toutes les tâches sont terminées !
							</h2>
							<p className="text-gray-600">
								Revenez demain pour continuer votre parcours.
							</p>
						</CardContent>
					</Card>
				</div>
			</DashboardLayout>
		);
	}

	return (
		<DashboardLayout
			user={{
				name: data.user.name,
				level: data.stats.level,
			}}
		>
			<div className="max-w-4xl mx-auto space-y-6">
				{/* Header */}
				<div>
					<h1 className="text-3xl font-bold text-gray-900 mb-2">
						Tâche du Jour
					</h1>
					<p className="text-gray-600">
						Jour {task.day} • Semaine {task.week}
					</p>
				</div>

				{/* Info badges */}
				<div className="flex flex-wrap gap-3">
					<div className="flex items-center gap-2 px-4 py-2 bg-primary-100 text-primary-700 rounded-lg">
						<Calendar className="h-4 w-4" />
						<span className="font-medium">
							{new Date().toLocaleDateString("fr-FR", {
								weekday: "long",
								day: "numeric",
								month: "long",
							})}
						</span>
					</div>
					<div className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg">
						<Clock className="h-4 w-4" />
						<span className="font-medium">15 minutes</span>
					</div>
				</div>

				{/* Main task card */}
				<Card>
					<CardHeader>
						<CardTitle className="text-2xl">{task.title}</CardTitle>
					</CardHeader>
					<CardContent className="space-y-6">
						<p className="text-gray-700 text-lg leading-relaxed">
							{task.description}
						</p>

						{task.locked ? (
							<div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
								<Lock className="h-12 w-12 text-gray-400 mx-auto mb-3" />
								<h3 className="font-semibold text-gray-900 mb-2">
									Tâche Verrouillée
								</h3>
								<p className="text-gray-600">
									Complétez la tâche du jour précédent pour débloquer celle-ci.
								</p>
							</div>
						) : (
							<>
								{/* Instructions */}
								<div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
									<h4 className="font-semibold text-blue-900 mb-2">
										📝 Instructions
									</h4>
									<ol className="space-y-2 text-blue-800 text-sm">
										<li>1. Trouvez un endroit calme</li>
										<li>2. Prenez un moment pour réfléchir</li>
										<li>3. Notez vos réflexions</li>
										<li>4. Validez votre progression</li>
									</ol>
								</div>

								{/* Action buttons */}
								<div className="flex gap-3 pt-4">
									<Button
										size="lg"
										className="flex-1 bg-primary-500 hover:bg-primary-600"
									>
										Marquer comme complété
										<CheckCircle2 className="ml-2 h-5 w-5" />
									</Button>
									<Button variant="outline" size="lg">
										Plus tard
										<ArrowRight className="ml-2 h-5 w-5" />
									</Button>
								</div>
							</>
						)}
					</CardContent>
				</Card>

				{/* Stats */}
				<div className="grid grid-cols-3 gap-4">
					<Card>
						<CardContent className="pt-6 text-center">
							<div className="text-3xl font-bold text-primary-600">
								{data.stats.completedDays}
							</div>
							<div className="text-sm text-gray-600 mt-1">Jours complétés</div>
						</CardContent>
					</Card>
					<Card>
						<CardContent className="pt-6 text-center">
							<div className="text-3xl font-bold text-red-600">
								{data.stats.currentStreak}
							</div>
							<div className="text-sm text-gray-600 mt-1">Série actuelle</div>
						</CardContent>
					</Card>
					<Card>
						<CardContent className="pt-6 text-center">
							<div className="text-3xl font-bold text-yellow-600">+50</div>
							<div className="text-sm text-gray-600 mt-1">Points à gagner</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</DashboardLayout>
	);
}
