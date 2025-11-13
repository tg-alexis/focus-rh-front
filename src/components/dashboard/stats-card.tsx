"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
	title: string;
	value: string | number;
	description?: string;
	icon: LucideIcon;
	trend?: {
		value: number;
		isPositive: boolean;
	};
	color?: string;
}

export function StatsCard({
	title,
	value,
	description,
	icon: Icon,
	trend,
	color = "text-primary-500",
}: StatsCardProps) {
	return (
		<Card className="hover:shadow-lg transition-shadow">
			<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
				<CardTitle className="text-sm font-medium text-gray-600">
					{title}
				</CardTitle>
				<Icon className={cn("h-5 w-5", color)} />
			</CardHeader>
			<CardContent>
				<div className="text-3xl font-bold text-gray-900">{value}</div>
				{description && (
					<p className="text-xs text-gray-500 mt-1">{description}</p>
				)}
				{trend && (
					<div className="flex items-center mt-2">
						<span
							className={cn(
								"text-xs font-medium",
								trend.isPositive ? "text-green-600" : "text-red-600"
							)}
						>
							{trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}%
						</span>
						<span className="text-xs text-gray-500 ml-2">
							vs semaine dernière
						</span>
					</div>
				)}
			</CardContent>
		</Card>
	);
}
