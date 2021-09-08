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
				if (!currentUser) {
					return;
				}
				const { data } = await axios.get(
					`${process.env.REACT_APP_API_ROOT}/users/${currentUser.id}/dates`,
					{ headers: { Authorization: `Token ${currentUser.token}` } }
				);
				setWorkouts(data);
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
		) : (
			workouts.map((workout, i) => (
				<p key={i}>
					workout_id: {workout.workout_id}, time: {workout.time.toString().slice(0, 2)}:
					{workout.time.toString().slice(2)}
				</p>
			))
		);
	};

	return (
		<section className={styles.console}>
			<div role="presentation" className={styles.heading}>
				<h2 aria-label="today's schedule">
					Today <br />
				</h2>
				<p aria-label="today's date">{dayjs().format('MMMM D')}</p>
			</div>
			{renderWorkouts()}
			<Link
				className={styles.addWorkoutLink}
				to={`/calendar/${dayjs().format('DD-MM-YYYY')}`}
				aria-label="add workout today"
			>
				<IconContext.Provider value={{ className: styles.icon }}>
					<IoAddCircleOutline />
				</IconContext.Provider>
				<span>Schedule a workout today</span>
			</Link>
		</section>
	);
};
