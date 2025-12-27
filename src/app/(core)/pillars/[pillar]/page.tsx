import { DashboardLayout } from "@/components/layout/dashboard-layout";

interface PillarPageProps {
	params: Promise<{
		pillar: string;
	}>;
}

export default async function PillarPage({ params }: PillarPageProps) {
	// const pillarDetails = getPillarDetails(pillar);

	// if (!pillarDetails) {
	// 	notFound();
	// }

	return (
		<DashboardLayout>
			<p>pilir</p>
		</DashboardLayout>
	);
}
