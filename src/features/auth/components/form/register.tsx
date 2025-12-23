"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export const RegisterForm = () => {
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		confirmPassword: "",
		code: "",
	});
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [acceptTerms, setAcceptTerms] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const router = useRouter();

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);

		// Validation
		if (
			!formData.firstName ||
			!formData.lastName ||
			!formData.email ||
			!formData.password ||
			!formData.code
		) {
			toast("Veuillez remplir tous les champs");
			setIsLoading(false);
			return;
		}

		if (formData.password !== formData.confirmPassword) {
			toast("Les mots de passe ne correspondent pas");
			setIsLoading(false);
			return;
		}

		if (formData.password.length < 8) {
			toast("Le mot de passe doit contenir au moins 8 caractères");
			setIsLoading(false);
			return;
		}

		if (!acceptTerms) {
			toast("Vous devez accepter les conditions d'utilisation");
			setIsLoading(false);
			return;
		}

		// Simulation d'inscription
		setTimeout(() => {
			toast("Compte créé avec succès");
			setIsLoading(false);
		}, 1000);

		router.push("/dashboard");
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-5">
			<div className="grid grid-cols-2 gap-4">
				<div className="space-y-2">
					<Label htmlFor="firstName">Prénom</Label>
					<Input
						id="firstName"
						name="firstName"
						placeholder="Jean"
						value={formData.firstName}
						onChange={handleChange}
						className="h-11"
					/>
				</div>
				<div className="space-y-2">
					<Label htmlFor="lastName">Nom</Label>
					<Input
						id="lastName"
						name="lastName"
						placeholder="Dupont"
						value={formData.lastName}
						onChange={handleChange}
						className="h-11"
					/>
				</div>
			</div>

			<div className="space-y-2">
				<Label htmlFor="register-email">Email</Label>
				<Input
					id="register-email"
					name="email"
					type="email"
					placeholder="nom@exemple.com"
					value={formData.email}
					onChange={handleChange}
					className="h-11"
				/>
			</div>

			<div className="space-y-2">
				<Label htmlFor="register-password">Mot de passe</Label>
				<div className="relative">
					<Input
						id="register-password"
						name="password"
						type={showPassword ? "text" : "password"}
						placeholder="••••••••"
						value={formData.password}
						onChange={handleChange}
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
				<p className="text-xs text-muted-foreground">Minimum 8 caractères</p>
			</div>

			<div className="space-y-2">
				<Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
				<div className="relative">
					<Input
						id="confirmPassword"
						name="confirmPassword"
						type={showConfirmPassword ? "text" : "password"}
						placeholder="••••••••"
						value={formData.confirmPassword}
						onChange={handleChange}
						className="h-11 pr-10"
					/>
					<button
						type="button"
						onClick={() => setShowConfirmPassword(!showConfirmPassword)}
						className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
					>
						{showConfirmPassword ? (
							<EyeOff className="h-4 w-4" />
						) : (
							<Eye className="h-4 w-4" />
						)}
					</button>
				</div>
			</div>
			<div className="space-y-2">
				<Label htmlFor="register-code">Code</Label>
				<Input
					id="register-code"
					name="code"
					type="text"
					placeholder="Entrez votre code"
					value={formData.code}
					onChange={handleChange}
					className="h-11"
				/>
			</div>

			<div className="flex items-start space-x-2">
				<Checkbox
					id="terms"
					checked={acceptTerms}
					onCheckedChange={(checked: unknown) =>
						setAcceptTerms(checked as boolean)
					}
				/>
				<label
					htmlFor="terms"
					className="text-sm text-muted-foreground  whitespace-nowrap leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
				>
					J&apos;accepte les{" "}
					<button
						type="button"
						className="text-secondary-200 font-bold hover:text-secondary-700 transition-colors"
					>
						conditions d&apos;utilisation
					</button>{" "}
					et la{" "}
					<button
						type="button"
						className="text-secondary-200 font-bold hover:text-secondary-700 transition-colors"
					>
						politique de confidentialité
					</button>
				</label>
			</div>

			<Button
				type="submit"
				className="w-full h-11 font-semibold shadow-lg hover:shadow-xl transition-all"
				disabled={isLoading}
			>
				{isLoading ? "Création du compte..." : "Créer mon compte"}
			</Button>
		</form>
	);
};

import {
	Field,
	FieldDescription,
	FieldGroup,
	FieldLabel,
	FieldSet,
} from "@/components/ui/field";

export function FieldInput() {
	return (
		<div className="w-full max-w-md">
			<FieldSet>
				<FieldGroup>
					<Field>
						<FieldLabel htmlFor="username">Username</FieldLabel>
						<Input id="username" type="text" placeholder="Max Leiter" />
						<FieldDescription>
							Choose a unique username for your account.
						</FieldDescription>
					</Field>
					<Field>
						<FieldLabel htmlFor="password">Password</FieldLabel>
						<FieldDescription>
							Must be at least 8 characters long.
						</FieldDescription>
						<Input id="password" type="password" placeholder="••••••••" />
					</Field>
				</FieldGroup>
			</FieldSet>
		</div>
	);
}
