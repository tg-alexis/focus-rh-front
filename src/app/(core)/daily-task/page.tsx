"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetDailyContent } from "@/features/daily-task/api/get-daily-content";
import { WeeklyEvaluationForm } from "@/features/daily-task/components/form/weekly-evaluation-form";
import EndTask from "@/features/daily-task/components/ui/end-task";
import DailyTaskView from "@/features/daily-task/views";

export default function DailyTaskPage() {
	const { data: dailyContent, isLoading } = useGetDailyContent();

	if (isLoading) {
		return (
			<DashboardLayout>
				<div className="space-y-8">
					<Skeleton className="h-96 w-full" />
				</div>
			</DashboardLayout>
		);
	}

	const task = dailyContent?.task;

	if (!task) {
		return (
			<DashboardLayout>
				<EndTask />
			</DashboardLayout>
		);
	}

	return (
		<DashboardLayout>
			<div className="space-y-8">
				<DailyTaskView data={dailyContent} task={task} />

				{/* Weekly Evaluation Form */}
				<div className="max-w-4xl mx-auto">
					<WeeklyEvaluationForm weekNumber={task.week} />
				</div>
			</div>
		</DashboardLayout>
	);
}
