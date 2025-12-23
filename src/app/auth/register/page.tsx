"use client";

import {
	useCreateUser,
	useValidateAccessCode,
} from "@/features/auth/hooks/useUser";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
		firstName: "",
		lastName: "",
		phoneNumber: "",
		accessCode: "",
		startDay: "monday" as "monday" | "custom",
	});

	const { mutate: createUser, isPending } = useCreateUser();
	const { mutate: validateCode, isPending: isValidating } =
		useValidateAccessCode();
	const router = useRouter();

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleValidateCode = () => {
		validateCode(
			{ accessCode: formData.accessCode },
			{
				onSuccess: (data) => {
					if (data.isValid && data.canBeUsed) {
						alert("Code d'accès valide !");
					} else {
						alert(data.message || "Code d'accès invalide");
					}
				},
			}
		);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		createUser(formData, {
			onSuccess: () => {
				router.push("/auth/login");
			},
		});
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
				<div>
					<h2 className="text-center text-3xl font-extrabold text-gray-900">
						Créer un compte
					</h2>
					<p className="mt-2 text-center text-sm text-gray-600">
						Rejoignez Focus RH
					</p>
				</div>

				<form className="mt-8 space-y-6" onSubmit={handleSubmit}>
					<div className="space-y-4">
						<div className="grid grid-cols-2 gap-4">
							<div>
								<label
									htmlFor="firstName"
									className="block text-sm font-medium text-gray-700"
								>
									Prénom
								</label>
								<input
									id="firstName"
									name="firstName"
									type="text"
									required
									value={formData.firstName}
									onChange={handleChange}
									className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
								/>
							</div>

							<div>
								<label
									htmlFor="lastName"
									className="block text-sm font-medium text-gray-700"
								>
									Nom
								</label>
								<input
									id="lastName"
									name="lastName"
									type="text"
									required
									value={formData.lastName}
									onChange={handleChange}
									className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
								/>
							</div>
						</div>

						<div>
							<label
								htmlFor="email"
								className="block text-sm font-medium text-gray-700"
							>
								Email
							</label>
							<input
								id="email"
								name="email"
								type="email"
								required
								value={formData.email}
								onChange={handleChange}
								className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
							/>
						</div>

						<div>
							<label
								htmlFor="phoneNumber"
								className="block text-sm font-medium text-gray-700"
							>
								Téléphone
							</label>
							<input
								id="phoneNumber"
								name="phoneNumber"
								type="tel"
								required
								value={formData.phoneNumber}
								onChange={handleChange}
								className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
								placeholder="+33612345678"
							/>
						</div>

						<div>
							<label
								htmlFor="password"
								className="block text-sm font-medium text-gray-700"
							>
								Mot de passe
							</label>
							<input
								id="password"
								name="password"
								type="password"
								required
								value={formData.password}
								onChange={handleChange}
								className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
								placeholder="Min. 8 caractères"
							/>
						</div>

						<div>
							<label
								htmlFor="accessCode"
								className="block text-sm font-medium text-gray-700"
							>
								Code d&apos;accès
							</label>
							<div className="mt-1 flex gap-2">
								<input
									id="accessCode"
									name="accessCode"
									type="text"
									required
									value={formData.accessCode}
									onChange={handleChange}
									className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
								/>
								<button
									type="button"
									onClick={handleValidateCode}
									disabled={isValidating || !formData.accessCode}
									className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
								>
									Vérifier
								</button>
							</div>
						</div>

						<div>
							<label
								htmlFor="startDay"
								className="block text-sm font-medium text-gray-700"
							>
								Jour de début
							</label>
							<select
								id="startDay"
								name="startDay"
								value={formData.startDay}
								onChange={handleChange}
								className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
							>
								<option value="monday">Lundi prochain</option>
								<option value="custom">Date personnalisée</option>
							</select>
						</div>
					</div>

					<div>
						<button
							type="submit"
							disabled={isPending}
							className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
						>
							{isPending ? "Création en cours..." : "Créer mon compte"}
						</button>
					</div>

					<div className="text-center">
						<a
							href="/auth/login"
							className="text-sm text-blue-600 hover:text-blue-500"
						>
							Déjà un compte ? Se connecter
						</a>
					</div>
				</form>
			</div>
		</div>
	);
}
