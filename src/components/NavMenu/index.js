import React, { useState } from 'react';
import styles from './styles.module.css';
import { NavLink } from 'react-router-dom';

export default () => {
	const [isNavVisible, setIsNavVisible] = useState(false);

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

	const toggleNavVisiblity = () => {
		setIsNavVisible((prevState) => !prevState);
	};

	const navStyle = {
		left: isNavVisible ? '0' : '-100%',
		pointerEvents: isNavVisible ? 'none' : 'all',
	};

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
		<>
			<button
				className={styles.toggleNavButton}
				aria-label="toggle navigation menu visibility"
				onClick={toggleNavVisiblity}
			>
				☰
			</button>
			<nav className={styles.nav} style={navStyle}>
				<ul>{renderLinks()}</ul>
				<button onClick={handleLogoutButtonClick} aria-label="logout">
					Logout
				</button>
			</nav>
		</>
	);
};
