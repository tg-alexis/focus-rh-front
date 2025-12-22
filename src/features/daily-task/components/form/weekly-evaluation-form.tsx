"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { ClipboardCheck, Loader2, Send } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Field,
	FieldContent,
	FieldDescription,
	FieldError,
	FieldGroup,
	FieldLabel,
} from "@/components/ui/field";

import { submitWeeklyEvaluation } from "../../api/submit-weekly-evaluation";
import {
	WeeklyEvaluationFormData,
	weeklyEvaluationSchema,
} from "../../schema/weekly-evaluation.schema";

interface Question {
	id: string;
	type: "score" | "text";
	question: string;
	placeholder?: string;
}

const EVALUATION_QUESTIONS: Question[] = [
	{
		id: "activation",
		type: "score",
		question: "Comment évaluez-vous votre activation cette semaine ?",
		placeholder: "Note de 0 à 10",
	},
	{
		id: "satisfaction",
		type: "score",
		question: "Êtes-vous satisfait de vos progrès ?",
		placeholder: "Note de 0 à 10",
	},
	{
		id: "stress",
		type: "score",
		question: "Comment évaluez-vous votre niveau de stress ?",
		placeholder: "Note de 0 à 10",
	},
	{
		id: "learned",
		type: "text",
		question: "Ce que j'ai appris cette semaine",
		placeholder: "Décrivez ce que vous avez appris...",
	},
	{
		id: "deep",
		type: "text",
		question: "Ce que je veux garder",
		placeholder: "Les exercices d'expiration",
	},
	{
		id: "improve",
		type: "text",
		question: "Ce que je souhaite améliorer",
		placeholder: "Ma gestion du temps",
	},
];

interface WeeklyEvaluationFormProps {
	weekNumber: number;
	onSuccess?: () => void;
}

export const WeeklyEvaluationForm = ({
	weekNumber,
	onSuccess,
}: WeeklyEvaluationFormProps) => {
	const [scoreValues, setScoreValues] = useState<Record<string, number>>({});

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<WeeklyEvaluationFormData>({
		resolver: zodResolver(weeklyEvaluationSchema),
		defaultValues: {
			weekNumber,
			answers: [],
			learned: "",
			deep: "",
			improve: "",
		},
	});

	const mutation = useMutation({
		mutationFn: submitWeeklyEvaluation,
		onSuccess: () => {
			console.log("✅ Évaluation soumise avec succès");
			toast.success("Évaluation soumise avec succès !");
			reset();
			setScoreValues({});
			onSuccess?.();
		},
		onError: (error) => {
			console.error("❌ Erreur lors de la soumission:", error);
			toast.error(
				// error?.response?.data?.message ||
				"Erreur lors de la soumission de l'évaluation"
			);
		},
	});

	const onSubmit = (data: WeeklyEvaluationFormData) => {
		console.log("📝 Formulaire soumis avec les données:", data);
		console.log("📊 Valeurs des scores:", scoreValues);

		const answers = EVALUATION_QUESTIONS.map((q) => {
			let value: string | number;

			if (q.type === "score") {
				value = scoreValues[q.id] || 0;
			} else {
				// Access text fields safely
				const textValue =
					q.id === "learned"
						? data.learned
						: q.id === "deep"
						? data.deep
						: q.id === "improve"
						? data.improve
						: "";
				value = textValue || "";
			}

			return {
				type: q.type,
				questionId: q.id,
				question: q.question,
				value,
			};
		});

		const textAnswers = answers.filter(
			(
				a
			): a is {
				type: "text";
				questionId: string;
				question: string;
				value: string;
			} => a.type === "text"
		);

		const payload = {
			weekNumber,
			answers,
			textAnswers: textAnswers.length > 0 ? textAnswers : undefined,
			learned: data.learned || "",
			deep: data.deep || "",
			improve: data.improve || "",
		};

		console.log("🚀 Envoi du payload:", payload);

		mutation.mutate(payload);
	};

	return (
		<Card className="w-full">
			<CardHeader>
				<div className="flex items-center gap-3">
					<div className="p-2 bg-primary-100 rounded-lg">
						<ClipboardCheck className="h-6 w-6 text-primary-600" />
					</div>
					<div>
						<CardTitle className="text-2xl">Évaluation Hebdomadaire</CardTitle>
						<p className="text-sm text-muted-foreground mt-1">
							Semaine {weekNumber}
						</p>
					</div>
				</div>
			</CardHeader>
			<CardContent>
				<form
					onSubmit={handleSubmit(onSubmit, (errors) => {
						console.error("❌ Erreurs de validation du formulaire:", errors);
						toast.error("Veuillez remplir tous les champs requis");
					})}
					className="space-y-6"
				>
					<FieldGroup>
						{/* Questions de type score */}
						<div className="space-y-4">
							<h3 className="text-lg font-semibold text-gray-900">
								Évaluations
							</h3>
							{EVALUATION_QUESTIONS.filter((q) => q.type === "score").map(
								(question) => (
									<Field key={question.id}>
										<FieldLabel htmlFor={question.id}>
											{question.question}
										</FieldLabel>
										<FieldContent>
											<div className="space-y-3">
												<div className="flex flex-wrap items-center gap-2">
													{[...Array(11)].map((_, i) => (
														<button
															key={i}
															type="button"
															onClick={() =>
																setScoreValues((prev) => ({
																	...prev,
																	[question.id]: i,
																}))
															}
															className={`w-10 h-10 rounded-lg text-sm font-semibold transition-all ${
																scoreValues[question.id] === i
																	? "bg-primary-500 text-white shadow-md scale-110"
																	: "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105"
															}`}
															aria-label={`Note ${i}`}
														>
															{i}
														</button>
													))}
												</div>
												{scoreValues[question.id] !== undefined && (
													<div className="text-sm font-medium text-primary-600">
														Note sélectionnée : {scoreValues[question.id]}/10
													</div>
												)}
												<FieldDescription>
													Cliquez sur un chiffre pour noter de 0 (très faible) à
													10 (excellent)
												</FieldDescription>
											</div>
										</FieldContent>
									</Field>
								)
							)}
						</div>

						{/* Questions de type texte */}
						<div className="space-y-4 pt-6 border-t">
							<h3 className="text-lg font-semibold text-gray-900">
								Réflexions
							</h3>
							{EVALUATION_QUESTIONS.filter((q) => q.type === "text").map(
								(question) => (
									<Field key={question.id}>
										<FieldLabel htmlFor={question.id}>
											{question.question}
										</FieldLabel>
										<FieldContent>
											<textarea
												id={question.id}
												{...register(
													question.id as "learned" | "deep" | "improve"
												)}
												placeholder={question.placeholder}
												rows={3}
												className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
											/>
											<FieldError
												errors={[
													errors[question.id as "learned" | "deep" | "improve"],
												]}
											/>
										</FieldContent>
									</Field>
								)
							)}
						</div>
					</FieldGroup>

					{/* Submit button */}
					<div className="flex justify-end pt-4">
						<Button
							type="submit"
							size="lg"
							disabled={mutation.isPending}
							className="bg-primary-500 hover:bg-primary-600"
						>
							{mutation.isPending ? (
								<>
									<Loader2 className="mr-2 h-5 w-5 animate-spin" />
									Envoi en cours...
								</>
							) : (
								<>
									Soumettre l’évaluation
									<Send className="ml-2 h-5 w-5" />
								</>
							)}
						</Button>
					</div>
				</form>
			</CardContent>
		</Card>
	);
};
