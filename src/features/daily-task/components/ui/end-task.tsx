import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

const EndTask = () => {
	return (
		<div className="max-w-4xl mx-auto">
			<Card>
				<CardContent className="py-12 text-center">
					<CheckCircle2 className="h-16 w-16 text-green-600 mx-auto mb-4" />
					<h2 className="text-2xl font-bold text-gray-900 mb-2">
						Toutes les tâches sont terminées !
					</h2>
					<p className="text-gray-600">
						Revenez demain pour continuer votre parcours.
					</p>
				</CardContent>
			</Card>
		</div>
	);
};

export default EndTask;
