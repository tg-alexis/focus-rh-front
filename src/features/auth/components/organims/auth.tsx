"use client";

import Logo from "@/shared/components/organims/logo";
import { useState } from "react";
import { LoginForm } from "../form/login";
import { RegisterForm } from "../form/register";

const Auth = () => {
	const [isLogin, setIsLogin] = useState(true);

	return (
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
			<div className="mt-8">{isLogin ? <LoginForm /> : <RegisterForm />}</div>
		</div>
	);
};

export default Auth;
