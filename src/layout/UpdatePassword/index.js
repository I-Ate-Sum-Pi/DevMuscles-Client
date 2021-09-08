import React, { useState } from 'react';
import styles from './styles.module.css';
import { UpdatePasswordModal } from '../../components';

export default () => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleClick = () => {
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
	};
	return (
		<>
			<UpdatePasswordModal showModal={isModalOpen} closeModal={closeModal} />
			<section className={styles.deleteAccount} aria-label="update password">
				<p aria-label="update password explanation">
					To change your password click the button below
				</p>
				<button onClick={handleClick}>Update Password</button>
			</section>
		</>
	);
};
