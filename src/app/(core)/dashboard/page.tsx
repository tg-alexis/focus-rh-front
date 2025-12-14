"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import DashboardView from "@/features/dashboard/views";
import { mockDashboardData } from "@/lib/mock-data";

export default function Home() {
	const data = mockDashboardData;

	const handleStartTask = () => {
		console.log("Démarrage de la tâche:", data.nextTask?.title);
		// Navigation vers la page de la tâche
	};

	return (
		<DashboardLayout
			user={{
				name: data.user.name,
				level: data.stats.level,
			}}
		>
			<DashboardView data={data} handleStartTask={handleStartTask} />
		</DashboardLayout>
	);
}
