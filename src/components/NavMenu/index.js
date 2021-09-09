import React, { useState } from 'react';
import styles from './styles.module.css';
import { Link, NavLink } from 'react-router-dom';
import { IoReorderThree } from 'react-icons/io5';
import { IconContext } from 'react-icons';

export default () => {
	const [isNavVisible, setIsNavVisible] = useState(false);

	const pages = [
		{
			name: 'Home',
			link: '/dashboard',
		},
		{
			name: 'Calendar',
			link: '/calendar',
		},
		{
			name: 'Profile',
			link: '/profile',
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
		pointerEvents: isNavVisible ? 'all' : 'none',
	};

	const renderLinks = () =>
		pages.map((page, i) => (
			<li key={i}>
				<NavLink activeClassName={styles.active} to={page.link}>
					{page.name}
				</NavLink>
			</li>
		));

	return (
		<>
			<div
				type="button"
				className={styles.toggleNavButton}
				aria-label="toggle navigation menu visibility"
				onClick={toggleNavVisiblity}
			>
				<IconContext.Provider value={{ className: styles.icon }}>
					<IoReorderThree />
				</IconContext.Provider>
			</div>
			<nav className={styles.nav} style={navStyle}>
				<ul>{renderLinks()}</ul>
				<div role="presentation" className={styles.bottomLinks}>
					<Link to="/logout">Logout</Link>
					<Link to="/privacy-policy">Privacy policy</Link>
				</div>
			</nav>
		</>
	);
};
