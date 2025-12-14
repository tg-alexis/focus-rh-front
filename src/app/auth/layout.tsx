import React from "react";

const RoutLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="min-h-screen flex">
			<div className="flex-1 flex items-center justify-center p-8 bg-background">
				{children}
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

export default RoutLayout;
