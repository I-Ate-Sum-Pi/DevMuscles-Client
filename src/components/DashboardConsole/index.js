import axios from 'axios';
import FadeLoader from 'react-spinners/FadeLoader';
import dayjs from 'dayjs';
import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';
import { css } from '@emotion/react';
import { IconContext } from 'react-icons';
import { IoAddCircleOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';

export default () => {
	const [workouts, setWorkouts] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [isError, setIsError] = useState(false);

	useEffect(() => {
		const fetchWorkouts = async () => {
			try {
				// TODO fetch from server
				const { data } = await axios.get('/url');
				setWorkouts(data);
				setIsLoading(false);
			} catch (err) {
				console.log(err);
				setIsError(true);
			}
		};
		fetchWorkouts();
	}, []);

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
			workouts.map((workout, i) => <p key={i}>{workout.name}</p>)
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
