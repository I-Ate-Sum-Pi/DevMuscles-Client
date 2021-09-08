import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { ScheduleWorkoutModal } from '../../components';

export default () => {
	const [showModal, setShowModal] = useState(false);
	const [todaysWorkouts, setTodaysWorkouts] = useState([]);
	const { currentUser } = useAuth();
	const { date } = useParams();
	const { go } = useHistory();

	const showAddWorkoutModal = () => {
		setShowModal(true);
	};
	const closeAddWorkoutModal = () => {
		setShowModal(false);
	};

	const API_ROOT = process.env.REACT_APP_API_ROOT
		? process.env.REACT_APP_API_ROOT
		: 'https://devmuscles.herokuapp.com';

	useEffect(() => {
		const fetchDateWorkouts = async () => {
			try {
				const { data } = await axios.get(`${API_ROOT}/users/${currentUser.id}/dates?date=${date}`, {
					headers: {
						Authorization: `Token ${currentUser.token}`,
					},
				});
				let { dates, workouts } = data;
				if (dates.length > 0) {
					dates = dates
						.reduce((acc, curr) => {
							const workoutIndex = workouts.findIndex((workout) => workout.id === curr.workout_id);
							const newData = {
								...workouts[workoutIndex],
								...curr,
							};
							acc.push(newData);
							return acc;
						}, [])
						.sort((a, b) => a.time - b.time);
					setTodaysWorkouts(dates);
				}
			} catch (err) {
				console.error(err);
				return null;
			}
		};
		fetchDateWorkouts();
	}, []);

	const updateWorkoutCompletion = async (workout) => {
		try {
			const { data } = await axios.put(
				`${API_ROOT}/users/${currentUser.id}/dates/${workout.id}`,
				{
					workout_id: workout.workout_id,
					time: workout.time,
					completed: !workout.completed,
					date,
				},
				{
					headers: {
						Authorization: `Token ${currentUser.token}`,
					},
				}
			);
			if (data) {
				go(0);
			}
		} catch (err) {
			console.error(err);
		}
	};

	const deleteWorkout = async (workout) => {
		try {
			const { status } = await axios.delete(
				`${API_ROOT}/users/${currentUser.id}/dates/${workout.id}`,
				{
					headers: {
						Authorization: `Token ${currentUser.token}`,
					},
				}
			);
			if (status === 204) {
				go(0);
			}
		} catch (err) {
			console.error(err);
		}
	};

	const renderWorkouts = () => {
		return todaysWorkouts.map((workout, i) => {
			return (
				<div key={i}>
					<h2>{workout.name}</h2>
					<p>
						{workout.time.toString().slice(0, 2)}:{workout.time.toString().slice(2)}
					</p>
					<button onClick={() => updateWorkoutCompletion(workout)}>
						Mark as {workout.completed ? 'in' : null}complete
					</button>
					<button
						onClick={() => {
							deleteWorkout(workout);
						}}
					>
						Delete Workout
					</button>
				</div>
			);
		});
	};
	return (
		<>
			<ScheduleWorkoutModal showModal={showModal} closeModal={closeAddWorkoutModal} />
			<section aria-label="workouts">
				{renderWorkouts()}
				<button onClick={showAddWorkoutModal}>Add Workout</button>
			</section>
		</>
	);
};
