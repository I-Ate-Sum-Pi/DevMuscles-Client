import React from 'react';
import styles from './styles.module.css';
import { Link } from 'react-router-dom';
import { PrivacyPolicyLink } from '../../components';

export default () => {
	return (
		<>
			<main className={styles.main}>
				<h1>DevMuscles</h1>
				<p>Plan today for a better tomorrow!</p>
				<div role="presentation" className={styles.links}>
					<Link to="/login" aria-label="login link">
						Login
					</Link>
					<Link to="/register" aria-label="registration link">
						Register
					</Link>
				</div>
			</main>
			<PrivacyPolicyLink />
		</>
	);
};
