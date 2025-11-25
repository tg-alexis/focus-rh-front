"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export const LoginForm = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const router = useRouter();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);

		// Validation basique
		if (!email || !password) {
			toast("Veuillez remplir tous les champs");
			setIsLoading(false);
			return;
		}

		// Simulation de connexion
		setTimeout(() => {
			toast("Connexion réussie !");
			setIsLoading(false);
		}, 1000);

		router.push("/dashboard");
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-6">
			<div className="space-y-2">
				<Label htmlFor="email">Email</Label>
				<Input
					id="email"
					type="email"
					placeholder="nom@exemple.com"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					className="h-11"
				/>
			</div>

			<div className="space-y-2">
				<div className="flex items-center justify-between">
					<Label htmlFor="password">Mot de passe</Label>
					<button
						type="button"
						className="text-sm text-secondary hover:text-secondary-700 transition-colors"
					>
						Mot de passe oublié ?
					</button>
				</div>
				<div className="relative">
					<Input
						id="password"
						type={showPassword ? "text" : "password"}
						placeholder="••••••••"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
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
			</div>

			<Button
				type="submit"
				className="w-full h-11 font-semibold shadow-lg hover:shadow-xl transition-all"
				disabled={isLoading}
			>
				{isLoading ? "Connexion..." : "Se connecter"}
			</Button>
		</form>
	);
};
