// src/pages/Login.tsx
import { useState } from "react";
import { useUserStore } from "../store/usersStore.ts";
import { useNavigate } from "@tanstack/react-router";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const login = useUserStore((state) => state.login);
	const navigate = useNavigate();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const success = await login(email, password);

		if (success) {
			const userId = useUserStore.getState().userId;
			console.log("Залогінився з userId:", userId);
			navigate({ to: "/posts" });
		} else {
			alert("Невірні дані");
		}
	};

	return (
		<div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
			<h2 className="text-2xl font-bold mb-4">Вхід</h2>
			<form onSubmit={handleSubmit} className="space-y-4">
				<input
					type="email"
					placeholder="Email"
					className="w-full p-2 border rounded"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
				/>
				<input
					type="password"
					placeholder="Пароль"
					className="w-full p-2 border rounded"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
				/>
				<button
					type="submit"
					className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
				>
					Увійти
				</button>
			</form>
		</div>
	);
};

export default Login;
