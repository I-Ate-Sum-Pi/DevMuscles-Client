import React from 'react';
import { Workout, NavMenu } from '../../components';
import styles from './styles.module.css';
export default () => {
	return (
		<>
			<NavMenu />
			<main className={styles.main}>
				<h1>Workouts</h1>
				<Workout />
			</main>
		</>
	);
};
