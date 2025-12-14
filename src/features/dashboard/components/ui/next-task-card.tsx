"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils/utils";
import { DailyTask } from "@/types/dashboard";
import { ArrowRight, CheckCircle2, Lock } from "lucide-react";

interface NextTaskCardProps {
	nextTask?: DailyTask;
	onStartTask?: () => void;
}

export function NextTaskCard({ nextTask, onStartTask }: NextTaskCardProps) {
	if (!nextTask) {
		return (
			<Card className="bg-linear-to-br from-green-50 to-emerald-50">
				<CardContent className="py-12 text-center">
					<CheckCircle2 className="h-16 w-16 text-green-600 mx-auto mb-4" />
					<h3 className="text-xl font-bold text-gray-900 mb-2">
						Félicitations !
					</h3>
					<p className="text-gray-600">
						Vous avez complété toutes les tâches disponibles.
					</p>
				</CardContent>
			</Card>
		);
	}

	return (
		<Card
			className={cn(
				"border-2",
				nextTask.locked
					? "bg-gray-50 border-gray-300"
					: "bg-white border-primary-500"
			)}
		>
			<CardHeader>
				<CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
					{nextTask.locked ? (
						<>
							<Lock className="h-6 w-6 text-gray-500" />
							Prochaine Étape (Verrouillée)
						</>
					) : (
						<>
							<ArrowRight className="h-6 w-6 text-primary-500" />
							Prochaine Étape
						</>
					)}
				</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="flex items-center gap-2 text-sm text-gray-600">
					<span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full font-medium">
						Jour {nextTask.day}
					</span>
					<span className="px-3 py-1 bg-secondary-100 text-secondary-700 rounded-full font-medium">
						Semaine {nextTask.week}
					</span>
				</div>

				<div>
					<h4 className="font-bold text-lg text-gray-900 mb-2">
						{nextTask.title}
					</h4>
					<p className="text-gray-600 text-sm leading-relaxed">
						{nextTask.description}
					</p>
				</div>

				{nextTask.locked ? (
					<div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-100 p-3 rounded-lg">
						<Lock className="h-4 w-4" />
						<span>Complétez l&apos;étape précédente pour débloquer</span>
					</div>
				) : (
					<Button
						onClick={onStartTask}
						className="w-full bg-primary-500 hover:bg-primary-600 text-white"
					>
						Commencer cette étape
						<ArrowRight className="ml-2 h-4 w-4" />
					</Button>
				)}
			</CardContent>
		</Card>
	);
}
