import React, { useState } from 'react';
import styles from './styles.module.css';
import { UpdateEmailModal } from '../../components';

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
			<UpdateEmailModal showModal={isModalOpen} closeModal={closeModal} />
			<section className={styles.deleteAccount} aria-label="update email">
				<p aria-label="update email explanation">To change your email click the button below</p>
				<button onClick={handleClick}>Update Email</button>
			</section>
		</>
	);
};
