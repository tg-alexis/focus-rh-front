"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserStats } from "@/types/dashboard";

interface ProgressCircleProps {
	stats: UserStats;
}

export function ProgressCircle({ stats }: ProgressCircleProps) {
	const circumference = 2 * Math.PI * 70;
	const offset = circumference - (stats.completionRate / 100) * circumference;

	return (
		<Card className="bg-linear-to-br from-primary-50 to-secondary-50">
			<CardHeader>
				<CardTitle className="text-xl font-bold text-gray-900">
					Progression Globale
				</CardTitle>
			</CardHeader>
			<CardContent className="flex flex-col items-center">
				<div className="relative w-48 h-48">
					<svg className="transform -rotate-90 w-48 h-48">
						{/* Background circle */}
						<circle
							cx="96"
							cy="96"
							r="70"
							stroke="currentColor"
							strokeWidth="12"
							fill="transparent"
							className="text-gray-200"
						/>
						{/* Progress circle */}
						<circle
							cx="96"
							cy="96"
							r="70"
							stroke="currentColor"
							strokeWidth="12"
							fill="transparent"
							strokeDasharray={circumference}
							strokeDashoffset={offset}
							className="text-primary-500 transition-all duration-1000 ease-out"
							strokeLinecap="round"
						/>
					</svg>
					<div className="absolute inset-0 flex flex-col items-center justify-center">
						<span className="text-5xl font-bold text-gray-900">
							{stats.completionRate}%
						</span>
						<span className="text-sm text-gray-600 mt-1">complété</span>
					</div>
				</div>

				<div className="mt-6 grid grid-cols-2 gap-4 w-full">
					<div className="text-center p-3 bg-white rounded-lg shadow-sm">
						<div className="text-2xl font-bold text-primary-500">
							{stats.completedDays}
						</div>
						<div className="text-xs text-gray-600">Jours complétés</div>
					</div>
					<div className="text-center p-3 bg-white rounded-lg shadow-sm">
						<div className="text-2xl font-bold text-secondary-500">
							{stats.totalDays - stats.completedDays}
						</div>
						<div className="text-xs text-gray-600">Jours restants</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
