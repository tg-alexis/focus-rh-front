"use client";

import { Button } from "@/components/ui/button";
import { useGetUserMe } from "@/shared/api/get-users-me";
import { Bell, User } from "lucide-react";
import { ReactNode } from "react";
import { MobileNav } from "./mobile-nav";
import { Sidebar } from "./sidebar";

interface DashboardLayoutProps {
	children: ReactNode;
	user?: {
		name: string;
		level: number;
		avatar?: string;
	};
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
	const { data: userMe } = useGetUserMe();

	return (
		<div className="flex min-h-screen bg-gray-50">
			{/* Sidebar - Desktop only */}
			<div className="hidden lg:block">
				<Sidebar />
			</div>

			{/* Main content area */}
			<div className="flex-1 flex flex-col">
				{/* Header */}
				<header className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
					<div className="px-4 sm:px-6 lg:px-8 py-4">
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-4">
								{/* Mobile menu */}
								<MobileNav />

								<h1 className="text-xl sm:text-2xl font-bold text-primary-500">
									🌟 <span className="hidden sm:inline">Tableau de bord</span>
								</h1>
							</div>
							<div className="flex items-center gap-2 sm:gap-4">
								<Button variant="ghost" size="icon" className="relative">
									<Bell className="h-5 w-5" />
									<span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
								</Button>
								{userMe && (
									<div className="flex items-center gap-3">
										<div className="text-right hidden sm:block">
											<div className="font-semibold text-gray-900 text-sm">
												{userMe?.firstName}
											</div>
											{/* <div className="text-xs text-gray-500">
												Niveau {user.level}
											</div> */}
										</div>
										<div className="w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center text-white font-bold">
											<User className="h-6 w-6" />
										</div>
									</div>
								)}
							</div>
						</div>
					</div>
				</header>

				{/* Main content */}
				<main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto pb-20 lg:pb-8">
					{children}
				</main>

				{/* Footer */}
				<footer className="bg-white border-t border-gray-200 mt-auto">
					<div className="px-4 sm:px-6 lg:px-8 py-6">
						<div className="text-center text-gray-600 text-sm">
							<p>© 2024 FocusRH - Carnet Bien-être. Tous droits réservés.</p>
							<p className="mt-1 text-xs">
								Transformez votre organisation, un jour à la fois.
							</p>
						</div>
					</div>
				</footer>
			</div>
		</div>
	);
}
