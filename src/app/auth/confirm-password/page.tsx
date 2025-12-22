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
import { useResetPassword } from "@/features/auth/hooks/useAuth";
import {
	ResetPasswordDto,
	ResetPasswordSchema,
} from "@/features/auth/schema/auth-schema";
import { paths } from "@/paths";
import Logo from "@/shared/components/organims/logo";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const ConfirmPasswordPage = () => {
	// const params = useParams();

	const form = useForm<ResetPasswordDto>({
		resolver: zodResolver(ResetPasswordSchema),
		defaultValues: {
			email: "",
			otpCode: "",
			newPassword: "",
		},
	});

	const { mutate: resetPassword, isPending } = useResetPassword();

	const [showPassword, setShowPassword] = useState(false);

	const Submit = async (data: ResetPasswordDto) => {
		resetPassword(data, {
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
					Mettez votre nouveau mot de passe
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
									placeholder="votre@email.com"
									className="h-11"
								/>

								{form.formState.errors.email && (
									<FieldError className="text-destructive text-sm">
										{form.formState.errors.email.message}
									</FieldError>
								)}
							</Field>

							<Field>
								<FieldLabel htmlFor="otpCode">Code OTP</FieldLabel>

								<Input
									id="otpCode"
									type="text"
									{...form.register("otpCode")}
									placeholder="00000"
									className="h-11"
								/>

								{form.formState.errors.otpCode && (
									<FieldError>
										{form.formState.errors.otpCode.message}
									</FieldError>
								)}
							</Field>

							<Field>
								<FieldLabel htmlFor="newPassword">
									Nouveau mot de passe
								</FieldLabel>
								<div className="relative">
									<Input
										id="newPassword"
										type={showPassword ? "text" : "password"}
										{...form.register("newPassword")}
										placeholder="......"
										className="h-11"
									/>
									<button
										type="button"
										onClick={() => setShowPassword(!showPassword)}
										className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
									>
										{showPassword ? (
											<EyeOff className="h-4 w-4" />
										) : (
											<Eye className="h-4 w-4" />
										)}
									</button>
								</div>

								{form.formState.errors.newPassword && (
									<FieldError>
										{form.formState.errors.newPassword.message}
									</FieldError>
								)}
							</Field>

							<Field>
								<Button
									type="submit"
									className="w-full h-11 font-semibold shadow-lg hover:shadow-xl transition-all"
									disabled={isPending}
								>
									{isPending ? "En cours..." : "Modifier le mot de passe"}
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

export default ConfirmPasswordPage;
