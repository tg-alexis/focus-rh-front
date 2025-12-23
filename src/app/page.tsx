import { auth } from "@/lib/auth/auth";
import { paths } from "@/paths";
import { redirect } from "next/navigation";

export default async function Home() {
	const session = await auth();

	if (session) {
		redirect(paths.core.dashboard);
	} else {
		redirect(paths.auth.root);
	}
}
