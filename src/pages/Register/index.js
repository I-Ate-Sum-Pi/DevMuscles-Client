import React from 'react';
import styles from './styles.module.css';
import { Link } from 'react-router-dom';
import { RegistrationForm } from '../../layout';

export default () => {
	return (
		<>
			<Link className={styles.homeButton} to="/" aria-label="return to landing page">
				Go back
			</Link>
			<main className={styles.main}>
				<h1>Register</h1>
				<RegistrationForm />
				<Link to="/register" aria-label="go to register page">
					Already have an account yet? Login here
				</Link>
			</main>
		</>
	);
};
