import React, { useState } from 'react';
import styles from './styles.module.css';

export default () => {
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);

	const togglePassword = (e) => {
		e.preventDefault();
		setIsPasswordVisible((prevState) => !prevState);
	};

	let passwordInputType = () => (isPasswordVisible ? 'text ' : 'password');
	return (
		<form className={styles.form} aria-label="login form">
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