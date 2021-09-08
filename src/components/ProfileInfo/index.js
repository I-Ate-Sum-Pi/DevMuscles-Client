import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

export default function index() {
	const { currentUser } = useAuth();
	return (
		<section aria-label="user information">
			<p aria-label="username">Username: {currentUser.username}</p>
			<p aria-label="email">Email: {currentUser.email}</p>
		</section>
	);
}
