"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import EndTask from "@/features/daily-task/components/ui/end-task";
import DailyTaskView from "@/features/daily-task/views";
import { mockDashboardData } from "@/lib/mock-data";

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
				<EndTask />
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
			<DailyTaskView data={data} task={task} />
		</DashboardLayout>
	);
}
