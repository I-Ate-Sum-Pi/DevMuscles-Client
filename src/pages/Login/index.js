import React from 'react';
import styles from './styles.module.css';
import { Link } from 'react-router-dom';
import { LoginForm } from '../../layout';
import { PrivacyPolicyLink } from '../../components';

export default () => {
	return (
		<>
			<Link className={styles.homeButton} to="/" aria-label="return to landing page">
				Home
			</Link>
			<main className={styles.main}>
				<h1>Login</h1>
				<LoginForm />
				<p>Don't have an account yet?</p>
				<Link to="/register" aria-label="go to register page">
					Register here
				</Link>
			</main>
			<PrivacyPolicyLink />
		</>
	);
};
