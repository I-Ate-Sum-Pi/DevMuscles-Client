import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = React.createContext();
const API_ROOT = process.env.REACT_APP_API_URL;

export function useAuth() {
	return useContext(AuthContext);
}

export function AuthProvider({ children }) {
	const [currentUser, setCurrentUser] = useState(null);

	async function register(username, email, password, confirmPassword) {
		try {
			const { data } = await axios.post(`${API_ROOT}/users`, {
				username,
				email,
				password,
				password_confirmation: confirmPassword,
			});
			setCurrentUser(data);
		} catch (err) {
			console.error(err);
		}
	}

	async function login(username, password) {
		try {
			const { data } = await axios.post(`${API_ROOT}/login`, { username, password });
			const { data: userData } = await axios.get(`${API_ROOT}/user/${data.id}`);
			localStorage.setItem('token', data.token);
			setCurrentUser({ ...userData, token: data.token });
		} catch (err) {
			console.error(err);
		}
	}

	function logout() {
		localStorage.removeItem('token');
		setCurrentUser(null);
	}

	useEffect(() => {
		function setToken() {
			const token = localStorage.getItem('token');
			if (token != null) {
				setCurrentUser((prevState) => {
					return { ...prevState, token: data.token };
				});
			} else {
				setCurrentUser(null);
			}
		}
		setToken();
	}, []);

	const value = {
		currentUser,
		register,
		login,
		logout,
	};
	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
