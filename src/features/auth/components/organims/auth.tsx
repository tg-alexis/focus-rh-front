"use client";
import Logo from "@/src/shared/components/organims/logo";
import { useState } from "react";
import { LoginForm } from "../form/login";
import { RegisterForm } from "../form/register";

const Auth = () => {
	const [isLogin, setIsLogin] = useState(true);

	return (
		<div className="min-h-screen flex">
			{/* Left side - Form */}
			<div className="flex-1 flex items-center justify-center p-8 bg-background">
				<div className="w-full max-w-md space-y-8">
					{/* Logo/Brand */}
					<div className="text-center space-y-2">
						<div className="w-full   flex items-center justify-center rounded-md mb-4">
							<Logo />
						</div>

						<p className="text-muted-foreground">
							{isLogin
								? "Bienvenue ! Connectez-vous à votre compte"
								: "Créez votre compte"}
						</p>
					</div>

					{/* Toggle Tabs */}
					<div className="flex gap-2 p-1 bg-muted rounded-lg">
						<button
							onClick={() => setIsLogin(true)}
							className={`flex-1 py-2 px-4 rounded-md font-medium transition-all ${
								isLogin
									? "bg-background text-foreground shadow-sm"
									: "text-muted-foreground hover:text-foreground"
							}`}
						>
							Connexion
						</button>
						<button
							onClick={() => setIsLogin(false)}
							className={`flex-1 py-2 px-4 rounded-md font-medium transition-all ${
								!isLogin
									? "bg-background text-foreground shadow-sm"
									: "text-muted-foreground hover:text-foreground"
							}`}
						>
							Inscription
						</button>
					</div>

					{/* Forms */}
					<div className="mt-8">
						{isLogin ? <LoginForm /> : <RegisterForm />}
					</div>
				</div>
			</div>

			{/* Right side - Visual */}
			<div className="hidden lg:flex flex-1 bg-linear-to-br from-primary via-primary-700 to-secondary items-center justify-center p-12 relative overflow-hidden">
				{/* Decorative circles */}
				<div className="absolute top-20 right-20 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
				<div className="absolute bottom-20 left-20 w-96 h-96 bg-secondary/20 rounded-full blur-3xl"></div>

				<div className="relative z-10 text-white space-y-6 max-w-lg">
					<h2 className="text-5xl font-bold leading-tight">
						Gérez vos ressources humaines avec simplicité
					</h2>
					<p className="text-xl text-white/90">
						Une plateforme complète pour optimiser la gestion de vos équipes et
						processus RH.
					</p>
					<div className="space-y-4 pt-4">
						<div className="flex items-center gap-3">
							<div className="w-12 h-12 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
								<svg
									className="w-6 h-6"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M5 13l4 4L19 7"
									/>
								</svg>
							</div>
							<div>
								<h3 className="font-semibold">Gestion simplifiée</h3>
								<p className="text-sm text-white/80">
									Interface intuitive et facile à utiliser
								</p>
							</div>
						</div>
						<div className="flex items-center gap-3">
							<div className="w-12 h-12 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
								<svg
									className="w-6 h-6"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
									/>
								</svg>
							</div>
							<div>
								<h3 className="font-semibold">Sécurisé</h3>
								<p className="text-sm text-white/80">
									Vos données protégées en toute sécurité
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Auth;
