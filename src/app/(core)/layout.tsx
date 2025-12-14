"use client";

import { paths } from "@/paths";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function CoreLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const { data: session, status } = useSession();
	const router = useRouter();

	useEffect(() => {
		if (status === "unauthenticated") {
			router.push(paths.auth.root);
		}
	}, [status, router]);

	// Afficher un loader pendant la vérification
	if (status === "loading") {
		return (
			<div className="flex items-center justify-center min-h-screen">
				<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
			</div>
		);
	}

	// Ne rien afficher si non authentifié (redirection en cours)
	if (!session) {
		return null;
	}

	return <div>{children}</div>;
}
