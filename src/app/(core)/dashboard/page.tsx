"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { useGetDashboardContent } from "@/features/dashboard/api/get-dashboard";
import DashboardView from "@/features/dashboard/views";

export default function Home() {
	const { data: dashboardData } = useGetDashboardContent();

	const handleStartTask = () => {
		console.log("Démarrage de la tâche:", dashboardData?.nextTask?.title);
		// Navigation vers la page de la tâche
	};

	return (
		<DashboardLayout>
			<DashboardView handleStartTask={handleStartTask} />
		</DashboardLayout>
	);
}
