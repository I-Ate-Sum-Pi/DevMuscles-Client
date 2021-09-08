import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, Link, useHistory, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import styles from './styles.module.css';

export default ({ showModal, closeModal }) => {
	const [timeValue, setTimeValue] = useState('10:00');
	const [workoutValue, setWorkoutValue] = useState('');

	const [workouts, setWorkouts] = useState([]);
	const { date } = useParams();
	const { currentUser } = useAuth();
	const { go } = useHistory();

	const API_ROOT = process.env.REACT_APP_API_ROOT
		? process.env.REACT_APP_API_ROOT
		: 'https://devmuscles.herokuapp.com';

	useEffect(() => {
		const fetchWorkouts = async () => {
			try {
				const { data } = await axios.get(`${API_ROOT}/users/${currentUser.id}/workouts`, {
					headers: {
						Authorization: `Token ${currentUser.token}`,
					},
				});
				setWorkouts(data);
			} catch (err) {
				console.error(err);
			}
		};
		fetchWorkouts();
	}, []);

	useEffect(() => {
		if (workouts.length > 0) {
			setWorkoutValue(workouts[0].id);
		}
	}, [workouts]);
	const renderWorkoutOptions = () => {
		return workouts.map((workout, i) => {
			return (
				<option key={i} value={workout.id}>
					{workout.name}
				</option>
			);
		});
	};

	const handleSubmit = async (e) => {
		try {
			e.preventDefault();
			const { data } = await axios.post(
				`${API_ROOT}/users/${currentUser.id}/dates`,
				{
					workout_id: workoutValue,
					time: parseInt(timeValue.split(':').join('')),
					completed: false,
					date,
				},
				{
					headers: {
						Authorization: `Token ${currentUser.token}`,
					},
				}
			);
			go(0);
		} catch (err) {
			console.error(err);
		}
	};

	const handleTimeChange = (e) => {
		setTimeValue(e.target.value);
	};

	const handleWorkoutChange = (e) => {
		setWorkoutValue(e.target.value);
	};

	const modalStyle = {
		display: showModal ? 'flex' : 'none',
	};
	return (
		<div style={modalStyle} className={styles.modal}>
			<button onClick={closeModal}>X</button>
			<section>
				<form onSubmit={handleSubmit}>
					<label htmlFor="time">Select time:</label>
					<input
						type="time"
						name="time"
						id="time"
						required
						value={timeValue}
						onChange={handleTimeChange}
					/>
					<label htmlFor="workout">Select a workout:</label>
					<select
						name="workout"
						id="workout"
						required
						value={workoutValue}
						onChange={handleWorkoutChange}
					>
						{renderWorkoutOptions()}
					</select>
					<input type="submit" value="Add workout" />
				</form>
				<p>
					Don't see the workout you want? Create a new workout on the
					<Link to="/workouts">workouts page</Link>
				</p>
			</section>
		</div>
	);
};
