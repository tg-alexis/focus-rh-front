"use client";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils/utils";
import { PillarDetail } from "@/types/dashboard";

interface PillarHeaderProps {
	pillar: PillarDetail;
}

export function PillarHeader({ pillar }: PillarHeaderProps) {
	return (
		<Card className={cn("border-0 shadow-lg overflow-hidden", pillar.gradient)}>
			<CardContent className="p-8">
				<div className="flex flex-col md:flex-row items-start md:items-center gap-6">
					{/* Icône */}
					<div
						className={cn(
							"w-20 h-20 rounded-2xl flex items-center justify-center text-4xl shadow-lg",
							pillar.color
						)}
					>
						{pillar.icon}
					</div>

					{/* Contenu */}
					<div className="flex-1">
						<h1 className="text-4xl font-bold text-white mb-2">
							{pillar.name}
						</h1>
						<p className="text-white/90 text-lg leading-relaxed">
							{pillar.description}
						</p>
					</div>

					{/* Progression */}
					<div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 text-center min-w-[140px]">
						<div className="text-5xl font-bold text-white mb-1">
							{pillar.progress}%
						</div>
						<div className="text-white/90 text-sm">
							{pillar.completedDays}/{pillar.totalDays} jours
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
