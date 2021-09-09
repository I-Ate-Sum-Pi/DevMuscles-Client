import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { useAuth } from '../../contexts/AuthContext';
import styles from './styles.module.css';
import { IconContext } from 'react-icons';
import { IoCloseCircleOutline } from 'react-icons/io5';

export default ({ showModal, closeModal }) => {
	const [formData, setFormData] = useState({
		email: '',
		newEmail: '',
	});
	const [isMatchError, setIsMatchError] = useState(true);
	const [isEmailUpdated, setIsEmailUpdated] = useState(false);

	const { currentUser, updateEmail } = useAuth();
	const { go } = useHistory();

	const handleChange = (e) => {
		setFormData((prevState) => {
			return { ...prevState, [e.target.id]: e.target.value };
		});
		if (e.target.id === 'email') {
			setIsMatchError(e.target.value !== currentUser.email);
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (isMatchError) {
			return;
		}
		const isUpdated = updateEmail(formData.newEmail);
		if (isUpdated) {
			setIsEmailUpdated(true);
		}
	};

	const refreshPage = () => {
		go(0);
	};

	const modalStyle = {
		display: showModal ? 'flex' : 'none',
	};

	return (
		<div style={modalStyle} className={styles.modal} aria-label="update email modal">
			<button onClick={closeModal} aria-label="close modal">
				<IconContext.Provider value={{ className: styles.closeButton }}>
					<IoCloseCircleOutline />
				</IconContext.Provider>
			</button>
			{!isEmailUpdated ? (
				<form aria-label="update email form" className={styles.form} onSubmit={handleSubmit}>
					<p>To update your email please enter your current email and your new email.</p>
					<label htmlFor="email">Current email:</label>
					<input
						id="email"
						name="email"
						type="email"
						required
						value={formData.email}
						onChange={handleChange}
						aria-label="old email"
					/>
					<label htmlFor="newEmail">New email:</label>
					<input
						id="newEmail"
						name="newEmail"
						type="email"
						required
						value={formData.newEmail}
						onChange={handleChange}
						aria-label="new email"
					/>
					<input
						type="submit"
						value={isMatchError ? 'disabled' : 'Update Email'}
						disabled={isMatchError}
					/>
				</form>
			) : (
				<>
					<p>Email successfully updated!</p>
					<button onClick={refreshPage} className={styles.backToProfile}>
						Back to profile
					</button>
				</>
			)}
		</div>
	);
};
