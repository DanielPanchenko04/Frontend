// src/store/userStore.ts
import { create } from "zustand";
import { loginUser as apiLoginUser } from "../api/mockApi.ts";

interface UserState {
	token: string | null;
	userId: number | null;
	login: (email: string, password: string) => Promise<boolean>;
	logout: () => void;
}

export const useUserStore = create<UserState>((set) => ({
	token: localStorage.getItem("token"),
	userId: localStorage.getItem("userId") ? Number(localStorage.getItem("userId")) : null,


	login: async (email, password) => {
		try {
			const {token, userId} = await apiLoginUser({ email, password });
			localStorage.setItem("userId", userId.toString());
			console.log(token);
			set({ token, userId });
			return true;

		} catch (error) {
			console.error("Login failed:", error);
			return false;
		}
	},

	logout: () => {
		localStorage.removeItem('token');
		localStorage.removeItem('userId');
		set({ token: null, userId: null });
	},
}));
