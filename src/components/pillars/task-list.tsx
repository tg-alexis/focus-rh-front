"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { PillarTask } from "@/src/types/dashboard";
import { CheckCircle2, Lock, Play } from "lucide-react";
import { useState } from "react";

interface TaskListProps {
	tasks: PillarTask[];
	pillarColor: string;
}

export function TaskList({ tasks, pillarColor }: TaskListProps) {
	const [expandedTask, setExpandedTask] = useState<string | null>(null);

	const toggleTask = (taskId: string) => {
		setExpandedTask(expandedTask === taskId ? null : taskId);
	};

	// Grouper par semaine
	const tasksByWeek = tasks.reduce((acc, task) => {
		const week = task.week;
		if (!acc[week]) {
			acc[week] = [];
		}
		acc[week].push(task);
		return acc;
	}, {} as Record<number, PillarTask[]>);

	return (
		<div className="space-y-6">
			{Object.entries(tasksByWeek).map(([week, weekTasks]) => (
				<Card key={week}>
					<CardHeader className="bg-gray-50">
						<CardTitle className="text-lg">
							Semaine {week} - {weekTasks.length} tâches
						</CardTitle>
					</CardHeader>
					<CardContent className="p-0">
						<div className="divide-y divide-gray-100">
							{weekTasks.map((task) => (
								<div
									key={task.id}
									className={cn(
										"transition-all",
										task.locked && "opacity-60",
										expandedTask === task.id && "bg-gray-50"
									)}
								>
									{/* En-tête de la tâche */}
									<div
										className="p-4 flex items-center gap-4 cursor-pointer hover:bg-gray-50 transition-colors"
										onClick={() => !task.locked && toggleTask(task.id)}
									>
										{/* Checkbox / Status */}
										<div className="shrink-0">
											{task.locked ? (
												<div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center">
													<Lock className="h-3 w-3 text-gray-500" />
												</div>
											) : task.completed ? (
												<div
													className={cn(
														"w-6 h-6 rounded-full flex items-center justify-center text-white",
														pillarColor
													)}
												>
													<CheckCircle2 className="h-4 w-4" />
												</div>
											) : (
												<Checkbox />
											)}
										</div>

										{/* Jour */}
										<div className="w-16 shrink-0">
											<div className="text-xs text-gray-500">Jour</div>
											<div className="font-bold text-gray-900">{task.day}</div>
										</div>

										{/* Titre */}
										<div className="flex-1 min-w-0">
											<h3
												className={cn(
													"font-semibold text-gray-900",
													task.completed && "line-through text-gray-500"
												)}
											>
												{task.title}
											</h3>
											{task.completed && task.completedAt && (
												<p className="text-xs text-gray-500 mt-0.5">
													Complété le{" "}
													{new Date(task.completedAt).toLocaleDateString(
														"fr-FR"
													)}
												</p>
											)}
										</div>

										{/* Durée */}
										{task.duration && (
											<div className="shrink-0 px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-600">
												{task.duration} min
											</div>
										)}

										{/* Action */}
										{!task.locked && !task.completed && (
											<Button
												size="sm"
												variant="outline"
												onClick={(e) => {
													e.stopPropagation();
													// Action pour commencer la tâche
												}}
											>
												<Play className="h-3 w-3 mr-1" />
												Commencer
											</Button>
										)}
									</div>

									{/* Détails étendus */}
									{expandedTask === task.id && !task.locked && (
										<div className="px-4 pb-4 pt-2 space-y-3 border-t border-gray-100">
											<div>
												<h4 className="font-semibold text-sm text-gray-700 mb-1">
													Description
												</h4>
												<p className="text-sm text-gray-600 leading-relaxed">
													{task.description}
												</p>
											</div>

											{task.steps && task.steps.length > 0 && (
												<div>
													<h4 className="font-semibold text-sm text-gray-700 mb-2">
														Étapes à suivre
													</h4>
													<ol className="space-y-2">
														{task.steps.map((step, index) => (
															<li
																key={index}
																className="flex items-start gap-2 text-sm text-gray-600"
															>
																<span className="shrink-0 w-5 h-5 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center text-xs font-semibold">
																	{index + 1}
																</span>
																<span className="leading-relaxed">{step}</span>
															</li>
														))}
													</ol>
												</div>
											)}

											{!task.completed && (
												<div className="flex gap-2 pt-2">
													<Button
														className={cn("flex-1", pillarColor)}
														onClick={() => {
															// Action pour marquer comme complété
														}}
													>
														<CheckCircle2 className="h-4 w-4 mr-2" />
														Marquer comme complété
													</Button>
												</div>
											)}
										</div>
									)}
								</div>
							))}
						</div>
					</CardContent>
				</Card>
			))}
		</div>
	);
}
