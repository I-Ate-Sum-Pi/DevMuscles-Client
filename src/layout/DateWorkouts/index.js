import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default () => {
	const [workouts, setWorkouts] = useState([]);
	const { currentUser } = useAuth();
	const API_ROOT = process.env.REACT_APP_API_ROOT
		? process.env.REACT_APP_API_ROOT
		: 'https://devmuscles.herokuapp.com';

	const { date } = useParams();
	useEffect(() => {
		const fetchDateWorkouts = async () => {
			try {
				const { data: dateWorkout } = await axios.get(
					`${API_ROOT}/users/${currentUser.id}/dates?date=${date}`
				);
				console.log(dateWorkout);
				if (dateWorkout) {
					setWorkouts(dateWorkout);
				}
			} catch (err) {
				console.error(err);
				return null;
			}
		};
		fetchDateWorkouts();
	}, []);
	return <section aria-label="workouts">{workouts}</section>;
};
