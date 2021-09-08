import React from 'react';
import styles from './styles.module.css';
import { NavMenu } from '../../components';
import { DeleteAccount } from '../../layout';

export default () => {
	return (
		<>
			<NavMenu />
			<main className={styles.main}>
				<h1>Profile</h1>
				<DeleteAccount />
			</main>
		</>
	);
};
