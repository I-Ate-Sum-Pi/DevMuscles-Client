import React, { useState } from 'react';
import styles from './styles.module.css';
import { useHistory } from 'react-router-dom';

export default () => {
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const { push } = useHistory();

	const togglePassword = (e) => {
		e.preventDefault();
		setIsPasswordVisible((prevState) => !prevState);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		push('/dashboard');
	};

	let passwordInputType = () => (isPasswordVisible ? 'text ' : 'password');
	return (
		<form className={styles.form} aria-label="login form" onSubmit={handleSubmit}>
			<label htmlFor="email">Email:</label>
			<input
				type="text"
				id="email"
				name="email"
				required
				placeholder="Email"
				aria-label="email field"
			/>
			<label htmlFor="password">Password:</label>
			<input
				type={passwordInputType()}
				id="password"
				name="password"
				required
				placeholder="Password"
				aria-label="password field"
			/>
			<button onClick={togglePassword} aria-label="toggle password visibilty">
				{isPasswordVisible ? 'Hide' : 'Show'} password
			</button>
			<input type="submit" value="Login" />
		</form>
	);
};
