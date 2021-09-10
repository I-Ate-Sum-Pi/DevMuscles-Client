import dayjs from 'dayjs';
import React from 'react';
import styles from './styles.module.css';
import { NavMenu } from '../../components';
import { Link, useParams } from 'react-router-dom';
import { DateWorkout } from '../../layout';
import { IoArrowBackCircleOutline } from 'react-icons/io5';
import { IconContext } from 'react-icons';

export default () => {
	const { date } = useParams();
	return (
		<>
			<NavMenu />
			<Link to="/calendar">
				<IconContext.Provider value={{ className: styles.goBackLink }}>
					<IoArrowBackCircleOutline />
				</IconContext.Provider>
			</Link>
			<main className={styles.main}>
				<h1>{dayjs(date).format('DD/MM/YYYY')}</h1>
				<p className={styles.info}>Your scheduled workouts:</p>
				<DateWorkout />
			</main>
		</>
	);
};
