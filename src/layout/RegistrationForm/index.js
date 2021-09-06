import React, { useState } from 'react';
import styles from './styles.module.css';
import { useHistory } from 'react-router-dom';

export default () => {
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

	const [formData, setFormData] = useState({
		email: '',
		username: '',
		password: '',
		confirmPassword: '',
	});

	const handleInputChange = (e) => {
		setFormData((prevState) => {
			return { ...prevState, [e.target.id]: e.target.value };
		});
	};

	const { push } = useHistory();
	const togglePassword = (e) => {
		e.preventDefault();
		setIsPasswordVisible((prevState) => !prevState);
	};

	const toggleConfirmPassword = (e) => {
		e.preventDefault();
		setIsConfirmPasswordVisible((prevState) => !prevState);
	};

	let passwordInputType = () => (isPasswordVisible ? 'text ' : 'password');
	let confirmPasswordInputType = () => (isConfirmPasswordVisible ? 'text ' : 'password');

	const handleSubmit = (e) => {
		e.preventDefault();
		push('/dashboard');
	};

	return (
		<form className={styles.form} aria-label="login form" onSubmit={handleSubmit}>
			<label htmlFor="username">Username:</label>
			<input
				type="text"
				id="username"
				name="username"
				required
				placeholder="Username"
				aria-label="username field"
				onChange={handleInputChange}
				value={formData.username}
			/>
			<label htmlFor="email">Email:</label>
			<input
				type="text"
				id="email"
				name="email"
				required
				placeholder="Email"
				aria-label="email field"
				onChange={handleInputChange}
				value={formData.email}
			/>
			<label htmlFor="password">Password:</label>
			<input
				type={passwordInputType()}
				id="password"
				name="password"
				required
				placeholder="Password"
				aria-label="password field"
				onChange={handleInputChange}
				value={formData.password}
			/>
			<button onClick={togglePassword} aria-label="toggle password visibilty">
				{isPasswordVisible ? 'Hide' : 'Show'} password
			</button>
			<label htmlFor="confirmPassword">Confirm password:</label>
			<input
				type={confirmPasswordInputType()}
				id="confirmPassword"
				name="confirmPassword"
				required
				placeholder="Password"
				aria-label="confirm password field"
				onChange={handleInputChange}
				value={formData.confirmPassword}
			/>
			<button onClick={toggleConfirmPassword} aria-label="toggle confirm password visibilty">
				{isConfirmPasswordVisible ? 'Hide' : 'Show'} password
			</button>
			<input type="submit" value="Login" />
		</form>
	);
};
