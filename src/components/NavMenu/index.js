import React from 'react';
import styles from './styles.module.css';
import { NavLink } from 'react-router-dom';

export default () => {
	const pages = [
		{
			name: 'Home',
			link: '/dashboard',
		},
		{
			name: 'Caledar',
			link: '/calendar',
		},
		{
			name: 'Profile',
			link: '/profile',
		},
		{
			name: 'Progress',
			link: '/progress',
		},
		{
			name: 'Workouts',
			link: '/workouts',
		},
	];

	const handleLogoutButtonClick = () => {
		// TODO Auth logout
		console.log('Logout button clicked');
	};

	const renderLinks = () =>
		pages.map((page, i) => (
			<li key={i}>
				<NavLink to={page.link}>{page.name}</NavLink>
			</li>
		));

	return (
		<nav className={styles.nav}>
			<ul>{renderLinks()}</ul>
			<button onClick={handleLogoutButtonClick} aria-label>
				Logout
			</button>
		</nav>
	);
};
