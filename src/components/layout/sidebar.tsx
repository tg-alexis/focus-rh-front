"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
	BarChart3,
	BookOpen,
	Brain,
	Calendar,
	ChevronLeft,
	ChevronRight,
	Heart,
	HelpCircle,
	LayoutDashboard,
	LogOut,
	Palette,
	Settings,
	Sparkles,
	Trophy,
	UserCircle,
	Users,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface MenuItem {
	id: string;
	label: string;
	icon: React.ElementType;
	href: string;
	badge?: string | number;
	children?: MenuItem[];
}

const menuItems: MenuItem[] = [
	{
		id: "dashboard",
		label: "Tableau de bord",
		icon: LayoutDashboard,
		href: "/",
	},
	{
		id: "daily",
		label: "Tâche du jour",
		icon: Calendar,
		href: "/daily-task",
		badge: "1",
	},
	{
		id: "pillars",
		label: "Piliers",
		icon: BookOpen,
		href: "/pillars",
		children: [
			{
				id: "mental-health",
				label: "Santé Mentale",
				icon: Brain,
				href: "/pillars/mental-health",
			},
			{
				id: "work-life",
				label: "Équilibre Vie Pro-Perso",
				icon: Heart,
				href: "/pillars/work-life-balance",
			},
			{
				id: "physical",
				label: "Bien-être Physique",
				icon: Sparkles,
				href: "/pillars/physical-wellness",
			},
			{
				id: "growth",
				label: "Développement Personnel",
				icon: Users,
				href: "/pillars/personal-growth",
			},
			{
				id: "relationships",
				label: "Relations Interpersonnelles",
				icon: UserCircle,
				href: "/pillars/relationships",
			},
			{
				id: "creativity",
				label: "Créativité",
				icon: Palette,
				href: "/pillars/creativity",
			},
		],
	},
	{
		id: "progress",
		label: "Ma Progression",
		icon: BarChart3,
		href: "/progress",
	},
	{
		id: "achievements",
		label: "Badges & Récompenses",
		icon: Trophy,
		href: "/achievements",
	},
];

const bottomMenuItems: MenuItem[] = [
	{
		id: "help",
		label: "Aide & Support",
		icon: HelpCircle,
		href: "/help",
	},
	{
		id: "settings",
		label: "Paramètres",
		icon: Settings,
		href: "/settings",
	},
];

interface SidebarProps {
	className?: string;
}

export function Sidebar({ className }: SidebarProps) {
	const [isCollapsed, setIsCollapsed] = useState(false);
	const [expandedItems, setExpandedItems] = useState<string[]>([]);

	const toggleExpand = (itemId: string) => {
		setExpandedItems((prev) =>
			prev.includes(itemId)
				? prev.filter((id) => id !== itemId)
				: [...prev, itemId]
		);
	};

	const renderMenuItem = (item: MenuItem, isChild = false) => {
		const hasChildren = item.children && item.children.length > 0;
		const isExpanded = expandedItems.includes(item.id);
		const Icon = item.icon;

		return (
			<div key={item.id}>
				<Link
					href={hasChildren ? "#" : item.href}
					onClick={(e) => {
						if (hasChildren) {
							e.preventDefault();
							toggleExpand(item.id);
						}
					}}
					className={cn(
						"flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group relative",
						"hover:bg-primary-50 hover:text-primary-700",
						"text-gray-700 font-medium",
						isChild && "pl-11 text-sm",
						isCollapsed && "justify-center"
					)}
				>
					<Icon className={cn("h-5 w-5 shrink-0", isChild && "h-4 w-4")} />
					{!isCollapsed && (
						<>
							<span className="flex-1">{item.label}</span>
							{item.badge && (
								<span className="px-2 py-0.5 bg-primary-500 text-white text-xs rounded-full font-bold">
									{item.badge}
								</span>
							)}
							{hasChildren && (
								<ChevronRight
									className={cn(
										"h-4 w-4 transition-transform",
										isExpanded && "rotate-90"
									)}
								/>
							)}
						</>
					)}

					{/* Tooltip pour collapsed */}
					{isCollapsed && (
						<div className="absolute left-full ml-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 transition-opacity">
							{item.label}
							{item.badge && (
								<span className="ml-2 px-1.5 py-0.5 bg-primary-500 text-white text-xs rounded-full">
									{item.badge}
								</span>
							)}
						</div>
					)}
				</Link>

				{/* Sous-menu */}
				{hasChildren && isExpanded && !isCollapsed && (
					<div className="mt-1 space-y-1">
						{item.children!.map((child) => renderMenuItem(child, true))}
					</div>
				)}
			</div>
		);
	};

	return (
		<aside
			className={cn(
				"bg-white border-r border-gray-200 flex flex-col transition-all duration-300 h-screen sticky top-0",
				isCollapsed ? "w-20" : "w-64",
				className
			)}
		>
			{/* Logo et Toggle */}
			<div className="p-4 border-b border-gray-200 flex items-center justify-between">
				{!isCollapsed ? (
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
				) : (
					<div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center text-white font-bold mx-auto">
						CB
					</div>
				)}

				<Button
					variant="ghost"
					size="icon"
					onClick={() => setIsCollapsed(!isCollapsed)}
					className={cn("h-8 w-8", isCollapsed && "mx-auto mt-2")}
				>
					{isCollapsed ? (
						<ChevronRight className="h-4 w-4" />
					) : (
						<ChevronLeft className="h-4 w-4" />
					)}
				</Button>
			</div>

			{/* Menu principal */}
			<nav className="flex-1 p-4 overflow-y-auto">
				<div className="space-y-1">
					{menuItems.map((item) => renderMenuItem(item))}
				</div>
			</nav>

			{/* Menu du bas */}
			<div className="p-4 border-t border-gray-200 space-y-1">
				{bottomMenuItems.map((item) => renderMenuItem(item))}

				{/* Déconnexion */}
				<button
					className={cn(
						"flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all w-full group relative",
						"hover:bg-red-50 hover:text-red-700",
						"text-gray-700 font-medium",
						isCollapsed && "justify-center"
					)}
				>
					<LogOut className="h-5 w-5 shrink-0" />
					{!isCollapsed && <span className="flex-1">Déconnexion</span>}

					{isCollapsed && (
						<div className="absolute left-full ml-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 transition-opacity">
							Déconnexion
						</div>
					)}
				</button>
			</div>

			{/* Version */}
			{!isCollapsed && (
				<div className="p-4 text-center text-xs text-gray-500 border-t border-gray-200">
					Version 1.0.0
				</div>
			)}
		</aside>
	);
}
