import React, { useState } from 'react';
import styles from './styles.module.css';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default () => {
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const { push } = useHistory();

	const [formData, setFormData] = useState({
		username: '',
		password: '',
	});

	const { login } = useAuth();

	const handleInputChange = (e) => {
		setFormData((prevState) => {
			return { ...prevState, [e.target.id]: e.target.value };
		});
	};

	const togglePassword = (e) => {
		e.preventDefault();
		setIsPasswordVisible((prevState) => !prevState);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const response = login(formData.username, formData.password);
		if (response) {
			push('/dashboard');
		} else {
			alert('Something went wrong, please try again.');
		}
	};

	let passwordInputType = () => (isPasswordVisible ? 'text ' : 'password');
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
			<input type="submit" value="Login" aria-label="submit login form" />
		</form>
	);
};
