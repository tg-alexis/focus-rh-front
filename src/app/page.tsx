import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Home() {
	return (
		<div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans ">
			<Button>Bouton vert</Button>
			<Button variant="link">Bouton vert</Button>
			<Button>Bouton vert</Button>

			<p className="text-secondary-500">Texte bleu FocusRH</p>

			<p className="text-gray-500">Texte gris doux</p>

			<Input placeholder="Votre texte ici" className="w-40" />
		</div>
	);
}
