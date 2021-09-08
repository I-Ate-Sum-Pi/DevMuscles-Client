import React, { useState } from 'react';
import styles from './styles.module.css';
import { NavLink, useHistory } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default () => {
	const [isNavVisible, setIsNavVisible] = useState(false);

	const { logout } = useAuth();
	const { push } = useHistory();
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
		pointerEvents: isNavVisible ? 'all' : 'none',
	};

	const handleLogoutButtonClick = () => {
		logout();
		push('/');
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
