"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Pillar } from "@/src/types/dashboard";

interface PillarProgressProps {
	pillars: Pillar[];
}

export function PillarProgress({ pillars }: PillarProgressProps) {
	return (
		<Card>
			<CardHeader>
				<CardTitle className="text-xl font-bold text-gray-900">
					Progression par Pilier
				</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="space-y-6">
					{pillars.map((pillar) => (
						<div key={pillar.id} className="space-y-2">
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-3">
									<div
										className={cn(
											"w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-lg",
											pillar.color
										)}
									>
										{pillar.icon}
									</div>
									<div>
										<h3 className="font-semibold text-gray-900">
											{pillar.name}
										</h3>
										<p className="text-xs text-gray-500">
											{pillar.description}
										</p>
									</div>
								</div>
								<div className="text-right">
									<div className="font-bold text-gray-900">
										{pillar.progress}%
									</div>
									<div className="text-xs text-gray-500">
										{pillar.completedDays}/{pillar.totalDays} jours
									</div>
								</div>
							</div>
							<div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
								<div
									className={cn(
										"h-full rounded-full transition-all duration-500",
										pillar.color
									)}
									style={{ width: `${pillar.progress}%` }}
								/>
							</div>
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	);
}
