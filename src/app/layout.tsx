import { Providers } from "@/lib/providers";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "../styles/globals.css";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Rh Focus",
	description:
		"Plateforme de suivi de développement RH pour les équipes et les individus avec des outils d'évaluation hebdomadaire et de feedback continu. Suivez l'évolution de vos collaborateurs et optimisez leur développement professionnel.",
};

export default function CoreLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
