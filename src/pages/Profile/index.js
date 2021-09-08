import React from 'react';
import styles from './styles.module.css';
import { NavMenu, ProfileInfo } from '../../components';
import { DeleteAccount, UpdatePassword } from '../../layout';

export default () => {
	return (
		<>
			<NavMenu />
			<main className={styles.main}>
				<h1>Profile</h1>
				<ProfileInfo />
				<UpdatePassword />
				<DeleteAccount />
			</main>
		</>
	);
};
