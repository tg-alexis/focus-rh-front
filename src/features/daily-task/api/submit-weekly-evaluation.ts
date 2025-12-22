import axiosInstance from "@/lib/api/axios.config";
import { ENDPOINTS_JOURNEY } from "../routes";
import { WeeklyEvaluationFormData } from "../schema/weekly-evaluation.schema";

export interface WeeklyEvaluationPayload {
	weekNumber: number;
	answers: Array<{
		type: "score" | "text";
		questionId: string;
		question: string;
		value: number | string;
	}>;
	textAnswers?: Array<{
		type: "text";
		questionId: string;
		question: string;
		value: string;
	}>;
}

export const submitWeeklyEvaluation = async (
	data: WeeklyEvaluationFormData
): Promise<void> => {
	const response = await axiosInstance.post(
		ENDPOINTS_JOURNEY.WEEKLY_EVALUATION,
		data
	);
	return response.data;
};
