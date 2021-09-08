import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = React.createContext();

const API_ROOT = process.env.REACT_APP_API_ROOT
	? process.env.REACT_APP_API_ROOT
	: 'https://devmuscles.herokuapp.com';

export function useAuth() {
	return useContext(AuthContext);
}

export function AuthProvider({ children }) {
	const [currentUser, setCurrentUser] = useState(null);
	const [loading, setLoading] = useState(true);

	async function register(username, email, password, confirmPassword) {
		try {
			const { data } = await axios.post(`${API_ROOT}/users/`, {
				username,
				email,
				password,
				password_confirmation: confirmPassword,
			});
			localStorage.setItem('token', data.token);
			localStorage.setItem('id', data.id);
			localStorage.setItem('username', data.username);
			localStorage.setItem('email', email);
			setCurrentUser({ token: data.token, id: data.id, username, email });
			return currentUser;
		} catch (err) {
			console.error(err);
			return null;
		}
	}

	async function login(username, password) {
		try {
			const { data } = await axios.post(`${API_ROOT}/login/`, { username, password });
			const { data: userData } = await axios.get(`${API_ROOT}/users/${data.id}`, {
				headers: { Authorization: `Token ${data.token}` },
			});
			localStorage.setItem('token', data.token);
			localStorage.setItem('id', data.id);
			localStorage.setItem('username', userData.username);
			localStorage.setItem('email', userData.email);
			setCurrentUser({
				token: data.token,
				id: data.id,
				username: userData.username,
				email: userData.email,
			});
			return currentUser;
		} catch (err) {
			console.error(err);
			return null;
		}
	}

	function logout() {
		localStorage.clear();
		setCurrentUser(null);
	}

	useEffect(() => {
		function setToken() {
			const token = localStorage.getItem('token');
			const username = localStorage.getItem('username');
			const email = localStorage.getItem('email');
			const id = localStorage.getItem('id');

			if (token != null && username != null && email != null && id != null) {
				setCurrentUser({ username, email, token, id });
			} else {
				setCurrentUser(null);
			}
			setLoading(false);
		}
		setToken();
	}, []);

	const value = {
		currentUser,
		register,
		login,
		logout,
	};
	return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}
