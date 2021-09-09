import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
// import bgImage from '../../assets/images/bg-portrait.png';

export default () => {
	useEffect(() => {
		// if (!process.env.REACT_APP_API_ROOT) alert('this website is currently under development');
	});
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
