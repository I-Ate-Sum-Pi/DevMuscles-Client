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
			<section className={styles.updateEmail} aria-label="update email">
				<button onClick={handleClick}>Update Email</button>
			</section>
		</>
	);
};
