import React from 'react';
import styles from './styles.module.css';
import { Link } from 'react-router-dom';
import { RegistrationForm } from '../../layout';
import { PrivacyPolicyLink } from '../../components';

export default () => {
	return (
		<>
			<Link className={styles.homeButton} to="/" aria-label="return to landing page">
				Home
			</Link>
			<main className={styles.main}>
				<h1>Register</h1>
				<RegistrationForm />
				<p>Already have an account yet?</p>
				<Link to="/login" aria-label="go to register page">
					Login here
				</Link>
			</main>
			<PrivacyPolicyLink />
		</>
	);
};
