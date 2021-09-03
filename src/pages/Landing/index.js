import React from 'react';
import { Link } from 'react-router-dom';

export default () => {
	return (
		<main>
			<h1>DevMuscles</h1>
			<Link to="/login" aria-label="login link">
				Login
			</Link>
			<Link to="/register" aria-label="registration link">
				Register
			</Link>
		</main>
	);
};
