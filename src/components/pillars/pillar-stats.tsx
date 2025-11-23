"use client";

import { Card, CardContent } from "@/components/ui/card";
import { PillarDetail } from "@/src/types/dashboard";
import {
	Award,
	Calendar,
	CheckCircle2,
	Clock,
	Target,
	TrendingUp,
} from "lucide-react";

interface PillarStatsProps {
	pillar: PillarDetail;
}

export function PillarStats({ pillar }: PillarStatsProps) {
	const stats = [
		{
			label: "Tâches complétées",
			value: pillar.completedDays,
			icon: CheckCircle2,
			color: "text-green-600",
			bgColor: "bg-green-50",
		},
		{
			label: "Tâches restantes",
			value: pillar.totalDays - pillar.completedDays,
			icon: Clock,
			color: "text-blue-600",
			bgColor: "bg-blue-50",
		},
		{
			label: "Semaines actives",
			value: Math.ceil(pillar.completedDays / 7),
			icon: Calendar,
			color: "text-purple-600",
			bgColor: "bg-purple-50",
		},
		{
			label: "Taux de réussite",
			value: `${pillar.progress}%`,
			icon: TrendingUp,
			color: "text-primary-600",
			bgColor: "bg-primary-50",
		},
		{
			label: "Points gagnés",
			value: pillar.pointsEarned || pillar.completedDays * 50,
			icon: Award,
			color: "text-yellow-600",
			bgColor: "bg-yellow-50",
		},
		{
			label: "Objectif",
			value: pillar.totalDays,
			icon: Target,
			color: "text-red-600",
			bgColor: "bg-red-50",
		},
	];

	return (
		<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
			{stats.map((stat, index) => {
				const Icon = stat.icon;
				return (
					<Card key={index} className="hover:shadow-md transition-shadow">
						<CardContent className="p-4">
							<div className="flex flex-col items-center text-center gap-2">
								<div className={`${stat.bgColor} p-3 rounded-lg`}>
									<Icon className={`h-5 w-5 ${stat.color}`} />
								</div>
								<div className="text-2xl font-bold text-gray-900">
									{stat.value}
								</div>
								<div className="text-xs text-gray-600 leading-tight">
									{stat.label}
								</div>
							</div>
						</CardContent>
					</Card>
				);
			})}
		</div>
	);
}
