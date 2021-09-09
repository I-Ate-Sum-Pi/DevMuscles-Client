import React, { useEffect } from 'react';
import styles from './styles.module.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default () => {
	const { logout } = useAuth();

	useEffect(() => {
		logout();
	}, []);

	return (
		<main className={styles.main}>
			<h1>Successfully Logged Out</h1>
			<section className={styles.content} role="presentation">
				<p aria-label="thanks message">Thanks for using DevMuscles! Come back soon!</p>
				<Link to="/">Return home</Link>
			</section>
		</main>
	);
};
