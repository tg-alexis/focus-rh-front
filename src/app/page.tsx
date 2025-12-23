import { auth } from "@/lib/auth/auth";
import { paths } from "@/paths";
import { redirect } from "next/navigation";

export default async function Home() {
	console.log("🔵 Root page: checking session...");
	const session = await auth();

	console.log("🔵 Root page session:", {
		hasSession: !!session,
		user: session?.user?.email,
	});

	if (session) {
		console.log("🔄 Root page: redirecting to dashboard");
		redirect(paths.core.dashboard);
	} else {
		console.log("🔄 Root page: redirecting to auth");
		redirect(paths.auth.root);
	}
}
