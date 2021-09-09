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
				<div role="presentation" className={styles.calendarInfo}>
					<p>Select a day to schedule a workout.</p>
					<p>
						Days with a <span className={styles.greenBorder}>green border</span> have a workout
						scheduled!
					</p>
				</div>
			</main>
		</>
	);
};
