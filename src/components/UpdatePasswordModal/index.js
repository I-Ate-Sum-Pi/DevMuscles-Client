import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import styles from './styles.module.css';

export default ({ showModal, closeModal }) => {
	const [formData, setFormData] = useState({
		password: '',
		newPassword: '',
		confirmNewPassword: '',
	});
	const [isMatchError, setIsMatchError] = useState(true);
	const [showPasswordMatchError, setShowPasswordMatchError] = useState(false);
	const [isPasswordUpdated, setIsPasswordUpdated] = useState(false);

	const { updatePassword } = useAuth();

	const handleChange = (e) => {
		setFormData((prevState) => {
			return { ...prevState, [e.target.id]: e.target.value };
		});
		setIsMatchError(
			e.target.id === 'newPassword'
				? e.target.value !== formData.confirmNewPassword
				: e.target.value !== formData.newPassword
		);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (isMatchError) {
			setShowPasswordMatchError(true);
			return;
		}
		const isUpdated = updatePassword(
			formData.password,
			formData.newPassword,
			formData.confirmNewPassword
		);
		if (isUpdated) {
			setIsPasswordUpdated(true);
		}
	};

	const modalStyle = {
		display: showModal ? 'flex' : 'none',
	};

	return (
		<div style={modalStyle} className={styles.modal} aria-label="update password modal">
			<button onClick={closeModal} aria-label="close modal">
				X
			</button>
			{!isPasswordUpdated ? (
				<form aria-label="update password form" className={styles.form} onSubmit={handleSubmit}>
					<label htmlFor="password">Current password:</label>
					<input
						id="password"
						name="password"
						type="password"
						required
						value={formData.password}
						onChange={handleChange}
						aria-label="old password"
					/>
					<label htmlFor="newPassword">New password:</label>
					<input
						id="newPassword"
						name="newPassword"
						type="password"
						required
						value={formData.newPassword}
						onChange={handleChange}
						aria-label="new password"
					/>
					<label htmlFor="confirmNewPassword">Confirm new password:</label>
					<input
						id="confirmNewPassword"
						name="confirmNewPassword"
						type="password"
						required
						value={formData.confirmNewPassword}
						onChange={handleChange}
						aria-label="confirm new password"
					/>
					<input type="submit" value="Update Password" />
					{showPasswordMatchError ? (
						<p className={styles.warningMessage} role="alert">
							New passwords do not match
						</p>
					) : null}
				</form>
			) : (
				<>
					<p>Password successfully updated!</p>
					<button onClick={closeModal}>Back to profile</button>
				</>
			)}
		</div>
	);
};
