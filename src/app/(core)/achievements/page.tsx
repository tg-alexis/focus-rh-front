import { DashboardLayout } from "@/components/layout/dashboard-layout";
import AchievementsView from "@/features/achievements/views";
// import AchievementsView from "@/features/achievements/views";

export default function PillarsPage() {
	return (
		<DashboardLayout>
			<AchievementsView />
		</DashboardLayout>
	);
}
