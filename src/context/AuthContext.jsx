/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
	const [token, setToken] = useState(() => localStorage.getItem("token") || "");
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (token) {
			localStorage.setItem("token", token);
		} else {
			localStorage.removeItem("token");
		}
	}, [token]);

	useEffect(() => {
		const bootstrapAuth = async () => {
			const storedToken = localStorage.getItem("token");

			if (!storedToken) {
				setLoading(false);
				return;
			}

			try {
				const response = await api.get("/auth/profile", {
					headers: {
						Authorization: `Bearer ${storedToken}`,
					},
				});

				setToken(storedToken);
				setUser(response.data.user);
			} catch {
				localStorage.removeItem("token");
				setToken("");
				setUser(null);
			} finally {
				setLoading(false);
			}
		};

		bootstrapAuth();
	}, []);

	const login = async (nextToken) => {
		setToken(nextToken);

		try {
			const response = await api.get("/auth/profile", {
				headers: {
					Authorization: `Bearer ${nextToken}`,
				},
			});

			setUser(response.data.user);
		} catch {
			setUser(null);
		}
	};

	const logout = () => {
		localStorage.removeItem("token");
		setToken("");
		setUser(null);
	};

	return (
		<AuthContext.Provider
			value={{ token, user, loading, login, logout }}
		>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	return useContext(AuthContext);
}
