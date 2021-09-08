import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default () => {
	const { logout } = useAuth();

	useEffect(() => {
		logout();
	}, []);

	return (
		<main>
			<h1>Successfully Logged Out</h1>
			<p aria-label="thanks message">Thanks for using DevMuscles! Come back soon!</p>
			<Link to="/">Return home</Link>
		</main>
	);
};
