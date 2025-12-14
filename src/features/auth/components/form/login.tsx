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

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { paths } from "@/paths";
import Link from "next/link";
import { useLogin } from "../../hooks/useAuth";
import { LoginDto, LoginSchema } from "../../schema/auth-schema";

export const LoginForm = () => {
	const [showPassword, setShowPassword] = useState(false);

	const { mutate: login, isPending } = useLogin();

	const router = useRouter();

	const form = useForm<LoginDto>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const Submit = async (data: LoginDto) => {
		login(data, {
			onSuccess: () => {
				router.push(paths.core.dashboard);
			},
		});
	};

	return (
		<>
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
							<FieldLabel htmlFor="password">Mot de passe</FieldLabel>
							<div className="relative">
								<Input
									id="password"
									type={showPassword ? "text" : "password"}
									placeholder="••••••••"
									{...form.register("password")}
									className="h-11 pr-10"
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
							{form.formState.errors.password && (
								<FieldError>
									{form.formState.errors.password.message}
								</FieldError>
							)}
						</Field>

						<Field>
							<Button
								type="submit"
								className="w-full h-11 font-semibold shadow-lg hover:shadow-xl transition-all"
								disabled={isPending}
							>
								{isPending ? "Connexion..." : "Se connecter"}
							</Button>
						</Field>
					</FieldGroup>
				</FieldSet>
			</form>

			<div className="text-center pt-8">
				<span className="text-sm">Vous avez oublié votre mot de passe ? </span>
				<Link
					href={paths.auth.forgetPasseword}
					className="text-sm hover:text-blue-500 font-semibold"
				>
					Mot de passe oublié
				</Link>
			</div>
		</>
	);
};
