import React from 'react';
import styles from './styles.module.css';
import { Calendar, NavMenu } from '../../components';

export default () => {
	return (
		<>
			<NavMenu />
			<main className={styles.main}>
				<h1>Your Workout Calendar</h1>
				<Calendar />
			</main>
		</>
	);
};
