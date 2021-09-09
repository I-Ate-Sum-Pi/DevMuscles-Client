import React, { useState } from 'react';
import styles from './styles.module.css';
import { useAuth } from '../../contexts/AuthContext';
import { IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5';
import { IconContext } from 'react-icons';

export default () => {
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);

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
		if (!response) {
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
			<button type="button" onClick={togglePassword} aria-label="toggle password visibilty">
				<IconContext.Provider value={{ className: styles.passwordIcon }}>
					{isPasswordVisible ? <IoEyeOutline /> : <IoEyeOffOutline />}
				</IconContext.Provider>
			</button>
			<input type="submit" value="Login" aria-label="submit login form" />
		</form>
	);
};
