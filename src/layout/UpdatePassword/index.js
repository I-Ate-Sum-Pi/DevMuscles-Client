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
			<section className={styles.updatePassword} aria-label="update password">
				<button onClick={handleClick}>Update Password</button>
			</section>
		</>
	);
};
