"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/utils";
import {
	BarChart3,
	Calendar,
	LayoutDashboard,
	Menu,
	Trophy,
	X,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface MobileNavItem {
	label: string;
	icon: React.ElementType;
	href: string;
	badge?: string | number;
}

const navItems: MobileNavItem[] = [
	{
		label: "Accueil",
		icon: LayoutDashboard,
		href: "/",
	},
	{
		label: "Tâche",
		icon: Calendar,
		href: "/daily-task",
		badge: "1",
	},
	{
		label: "Stats",
		icon: BarChart3,
		href: "/progress",
	},
	{
		label: "Badges",
		icon: Trophy,
		href: "/achievements",
	},
];

export function MobileNav() {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			{/* Menu burger button */}
			<Button
				variant="ghost"
				size="icon"
				className="lg:hidden"
				onClick={() => setIsOpen(!isOpen)}
			>
				{isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
			</Button>

			{/* Overlay */}
			{isOpen && (
				<div
					className="fixed inset-0 bg-black/50 z-40 lg:hidden"
					onClick={() => setIsOpen(false)}
				/>
			)}

			{/* Mobile menu */}
			<div
				className={cn(
					"fixed top-0 left-0 h-full w-64 bg-white shadow-xl z-50 transform transition-transform duration-300 lg:hidden",
					isOpen ? "translate-x-0" : "-translate-x-full"
				)}
			>
				<div className="p-4 border-b border-gray-200">
					<div className="flex items-center gap-2">
						<div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center text-white font-bold">
							CB
						</div>
						<div>
							<div className="font-bold text-gray-900 text-sm">
								Carnet Bien-être
							</div>
							<div className="text-xs text-gray-500">FocusRH</div>
						</div>
					</div>
				</div>

				<nav className="p-4">
					<div className="space-y-2">
						{navItems.map((item) => {
							const Icon = item.icon;
							return (
								<Link
									key={item.href}
									href={item.href}
									onClick={() => setIsOpen(false)}
									className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-primary-50 hover:text-primary-700 text-gray-700 font-medium transition-colors"
								>
									<Icon className="h-5 w-5" />
									<span className="flex-1">{item.label}</span>
									{item.badge && (
										<span className="px-2 py-0.5 bg-primary-500 text-white text-xs rounded-full font-bold">
											{item.badge}
										</span>
									)}
								</Link>
							);
						})}
					</div>
				</nav>
			</div>

			{/* Bottom navigation bar for mobile */}
			<div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-30 lg:hidden">
				<div className="grid grid-cols-4 gap-1 p-2">
					{navItems.map((item) => {
						const Icon = item.icon;
						return (
							<Link
								key={item.href}
								href={item.href}
								className="flex flex-col items-center gap-1 px-3 py-2 rounded-lg hover:bg-primary-50 transition-colors relative"
							>
								<Icon className="h-5 w-5 text-gray-700" />
								<span className="text-xs font-medium text-gray-700">
									{item.label}
								</span>
								{item.badge && (
									<span className="absolute top-1 right-2 w-2 h-2 bg-primary-500 rounded-full"></span>
								)}
							</Link>
						);
					})}
				</div>
			</div>
		</>
	);
}
