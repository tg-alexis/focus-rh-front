export default function Home() {
	// Cette page ne devrait jamais être affichée
	// Le proxy.ts gère toutes les redirections depuis la racine
	return (
		<div className="flex items-center justify-center min-h-screen">
			<div className="text-center">
				<h1 className="text-2xl font-bold mb-4">Chargement...</h1>
				<p className="text-gray-600">Redirection en cours...</p>
			</div>
		</div>
	);
}
