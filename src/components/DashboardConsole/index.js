import axios from 'axios';
import FadeLoader from 'react-spinners/FadeLoader';
import dayjs from 'dayjs';
import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';
import { css } from '@emotion/react';
import { IconContext } from 'react-icons';
import { IoAddCircleOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default () => {
	const [workouts, setWorkouts] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [isError, setIsError] = useState(false);
	const { currentUser } = useAuth();

	useEffect(() => {
		const fetchWorkouts = async () => {
			try {
				const API_ROOT = process.env.REACT_APP_API_ROOT
					? process.env.REACT_APP_API_ROOT
					: 'https://devmuscles.herokuapp.com';
				const { data } = await axios.get(
					`${API_ROOT}/users/${currentUser.id}/dates?date=${dayjs().format('YYYY-MM-DD')}`,
					{
						headers: { Authorization: `Token ${currentUser.token}` },
					}
				);
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
					setWorkouts(dates);
				}
				setIsLoading(false);
			} catch (err) {
				console.error(err);
				setIsError(true);
			}
		};
		fetchWorkouts();
	}, [currentUser]);

	const override = css`
		margin: 20px auto;
	`;

	const renderWorkouts = () => {
		return isError ? (
			<p role="alert">
				Oops! Something went wrong. <br /> Please refresh or try again later.
			</p>
		) : isLoading ? (
			<FadeLoader data-testid="spinner" loading={isLoading} size={50} css={override} />
		) : workouts.length > 0 ? (
			workouts.map((workout, i) => (
				<div key={i} className={styles.workout}>
					<p>
						{workout.time.toString().slice(0, 2)}:{workout.time.toString().slice(2)}
					</p>
					<Link to={`/workouts/${workout.workout_id}`}>{workout.name}</Link>
					{i === workouts.length - 1 ? null : <hr />}
				</div>
			))
		) : (
			<p>You have no workouts scheduled for today</p>
		);
	};

	return (
		<section className={styles.console}>
			<h2 aria-label="today's schedule">Your workouts for today</h2>
			{renderWorkouts()}
			<Link
				className={styles.addWorkoutLink}
				to={`/calendar/${dayjs().format('YYYY-MM-DD')}`}
				aria-label="add workout today"
			>
				<IconContext.Provider value={{ className: styles.icon }}>
					<IoAddCircleOutline />
				</IconContext.Provider>
			</Link>
		</section>
	);
};
