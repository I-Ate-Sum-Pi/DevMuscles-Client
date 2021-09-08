import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import styles from './styles.module.css';

export default ({ showModal, closeModal }) => {
	const [usernameValue, setUsernameValue] = useState('');
	const [isMatchError, setIsMatchError] = useState(true);

	const { currentUser, deleteAccount } = useAuth();

	const handleChange = (e) => {
		setUsernameValue(e.target.value);
		setIsMatchError(e.target.value !== currentUser.username);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (isMatchError) {
			return;
		}
		deleteAccount();
	};

	const modalStyle = {
		display: showModal ? 'flex' : 'none',
	};

	return (
		<div style={modalStyle} className={styles.modal} aria-label="delete account modal">
			<button onClick={closeModal} aria-label="close modal">
				X
			</button>
			<p role="alert">WARNING! This action is irrevesisble</p>
			<form aria-label="delete account form" className={styles.form} onSubmit={handleSubmit}>
				<label htmlFor="username">
					To delete your account please type <b>{currentUser.username}</b>
				</label>
				<input
					type="text"
					required
					value={usernameValue}
					onChange={handleChange}
					aria-label="confirm username"
				/>
				<input type="submit" value="Delete Account" disabled={isMatchError} />
			</form>
		</div>
	);
};
