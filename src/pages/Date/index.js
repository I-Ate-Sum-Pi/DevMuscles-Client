import React from 'react';
import { useParams } from 'react-router-dom';
import { DateWorkout } from '../../layout';

export default () => {
	const { date } = useParams();
	return (
		<main>
			<h1>{date}</h1>
			<DateWorkout />
		</main>
	);
};
