import React from 'react';
import { useParams } from 'react-router-dom';

const API_ROOT = process.env.REACT_APP_API_ROOT
	? process.env.REACT_APP_API_ROOT
	: 'https://devmuscles.herokuapp.com';

const { date } = useParams();

try {
	const { data: dateWorkout } = await axios.get(`${API_ROOT}/users/dates?${date}`);
	console.log(dateWorkout);
} catch (err) {
	console.error(err);
	return null;
}

export default () => {
	return (
		<main>
			<h1> `${date}` </h1>;
			<h2>This is the workouts for a paticular user on a paticular date `${dateWorkout}`</h2>
		</main>
	);
};
