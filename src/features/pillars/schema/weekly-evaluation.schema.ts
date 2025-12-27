import { z } from "zod";

export const answerSchema = z.object({
	type: z.enum(["score", "text"]),
	questionId: z.string(),
	question: z.string(),
	value: z.union([z.number().min(0).max(10), z.string().min(1)]),
});

export const weeklyEvaluationSchema = z.object({
	weekNumber: z.number().int().positive(),
	answers: z.array(answerSchema).optional(),
	textAnswers: z.array(
		z.object({
			type: z.literal("text"),
			questionId: z.string(),
			question: z.string(),
			value: z.string().min(1, "Cette réponse est requise"),
		})
	).optional(),
});

export type WeeklyEvaluationFormData = z.infer<typeof weeklyEvaluationSchema>;
export type Answer = z.infer<typeof answerSchema>;
