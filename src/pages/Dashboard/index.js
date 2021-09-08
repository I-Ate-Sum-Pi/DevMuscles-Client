import React from 'react';
import styles from './styles.module.css';
import { DashboardConsole, DashboardGreeting, NavMenu } from '../../components';
import { IconContext } from 'react-icons';
import { IoCalendarOutline, IoBodyOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';

export default () => {
	return (
		<>
			<NavMenu />
			<main className={styles.main}>
				<DashboardGreeting />
				<DashboardConsole />
				<div className={styles.links} role="presentation">
					<Link className={styles.iconLink} to="/calendar" aria-label="calendar page link">
						<IconContext.Provider value={{ className: styles.icon }}>
							<IoCalendarOutline />
						</IconContext.Provider>
						<span>Calendar</span>
					</Link>
					<Link className={styles.iconLink} to="/workouts" aria-label="workouts page link">
						<IconContext.Provider value={{ className: styles.icon }}>
							<IoBodyOutline />
						</IconContext.Provider>
						<span>Workouts</span>
					</Link>
				</div>
			</main>
		</>
	);
};
