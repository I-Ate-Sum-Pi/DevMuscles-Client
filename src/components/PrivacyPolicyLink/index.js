import React from 'react';
import styles from './styles.module.css';
import { Link } from 'react-router-dom';

export default () => {
	return (
		<Link className={styles.link} to="/privacy-policy">
			Privacy Policy
		</Link>
	);
};
