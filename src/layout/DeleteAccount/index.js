import React, { useState } from 'react';
import styles from './styles.module.css';
import { DeleteAccountModal } from '../../components';

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
			<DeleteAccountModal showModal={isModalOpen} closeModal={closeModal} />
			<section className={styles.deleteAccount} aria-label="delete account">
				<button onClick={handleClick}>Delete Account</button>
			</section>
		</>
	);
};
