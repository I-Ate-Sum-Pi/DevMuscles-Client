import React from 'react';
import styles from './styles.module.css';
import { useAuth } from '../../contexts/AuthContext';

export default () => {
	const { currentUser } = useAuth();
	return (
		<section aria-label="user information" className={styles.section}>
			<p aria-label="username">Username: {currentUser.username}</p>
			<p aria-label="email">Email: {currentUser.email}</p>
		</section>
	);
};
