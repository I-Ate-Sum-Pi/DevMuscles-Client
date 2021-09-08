import React from 'react';
import { useParams } from 'react-router-dom';

export default () => {
	const API_ROOT = process.env.REACT_APP_API_ROOT
		? process.env.REACT_APP_API_ROOT
		: 'https://devmuscles.herokuapp.com';

	const { date } = useParams();

	return (
		<main>
			<h1>Want to the put the date that the user tapped on here!</h1>;
			<h2>Put a Modal here for the workouts that the user has scheduled</h2>
		</main>
	);
};
