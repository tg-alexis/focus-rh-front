"use client";

import { Button } from "@/components/ui/button";
import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
	FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useRequestPasswordReset } from "@/features/auth/hooks/useAuth";
import {
	RequestPasswordResetDto,
	RequestPasswordResetSchema,
} from "@/features/auth/schema/auth-schema";
import { paths } from "@/paths";
import Logo from "@/shared/components/organims/logo";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const ResetPasswordPage = () => {
	const form = useForm<RequestPasswordResetDto>({
		resolver: zodResolver(RequestPasswordResetSchema),
		defaultValues: {
			email: "",
		},
	});

	const { mutate: requestPasswordReset, isPending } = useRequestPasswordReset();

	const Submit = async (data: RequestPasswordResetDto) => {
		requestPasswordReset(data, {
			onSuccess: () => {
				// router.push("/dashboard");

				toast.success("Mot de passe réinitialisé avec succès");
			},
		});
	};

	return (
		<div className="w-full max-w-md space-y-8">
			<div className="text-center space-y-2">
				<div className="w-full   flex items-center justify-center rounded-md mb-4">
					<Logo />
				</div>

				<p className="text-muted-foreground">
					Mettez votre email pour renitialiser le mot de passe
				</p>
			</div>

			<div className=" w-full">
				<form onSubmit={form.handleSubmit(Submit)} className="space-y-6">
					<FieldSet>
						<FieldGroup>
							<Field>
								<FieldLabel htmlFor="email">Email</FieldLabel>
								<Input
									id="email"
									type="email"
									{...form.register("email")}
									placeholder="nom@exemple.com"
									className="h-11"
								/>
								{form.formState.errors.email && (
									<FieldError>{form.formState.errors.email.message}</FieldError>
								)}
							</Field>

							<Field>
								<Button
									type="submit"
									className="w-full h-11 font-semibold shadow-lg hover:shadow-xl transition-all"
									disabled={isPending}
								>
									{isPending ? "En cours..." : "Envoyer"}
								</Button>
							</Field>
						</FieldGroup>
					</FieldSet>
				</form>

				<div className="text-center pt-8">
					<span className="text-sm">Vous déja un compte ? </span>
					<Link
						href={paths.auth.login}
						className="text-sm hover:text-blue-500 font-semibold"
					>
						Connectez-vous
					</Link>
				</div>
			</div>
		</div>
	);
};

export default ResetPasswordPage;
