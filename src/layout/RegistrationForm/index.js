import React, { useState } from 'react';
import styles from './styles.module.css';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5';
import { IconContext } from 'react-icons';

export default () => {
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
	const [isPasswordMatchError, setIsPasswordMatchError] = useState(false);

	const [formData, setFormData] = useState({
		email: '',
		username: '',
		password: '',
		confirmPassword: '',
	});

	const { register } = useAuth();

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

	const passwordStyle = {
		border: isPasswordMatchError ? '2px solid red' : '1px solid grey',
	};

	const validateFormData = () => {
		if (formData.password !== formData.confirmPassword) {
			setIsPasswordMatchError(true);
			return false;
		}
		return true;
	};

	const handleSubmit = (e) => {
		try {
			e.preventDefault();
			const isFormDataValid = validateFormData();
			if (!isFormDataValid) {
				return;
			}
			const { username, email, password, confirmPassword } = formData;
			const response = register(username, email, password, confirmPassword);
			if (!response) {
				throw new Error('Oops! Something went wrong');
			}
			push('/dashboard');
		} catch (err) {
			console.error(err);
		}
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
				type="email"
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
				style={passwordStyle}
			/>
			<button type="button" onClick={togglePassword} aria-label="toggle password visibilty">
				<IconContext.Provider value={{ className: styles.passwordIcon }}>
					{isPasswordVisible ? <IoEyeOutline /> : <IoEyeOffOutline />}
				</IconContext.Provider>
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
				style={passwordStyle}
			/>
			<button
				type="button"
				onClick={toggleConfirmPassword}
				aria-label="toggle confirm password visibilty"
			>
				<IconContext.Provider value={{ className: styles.passwordIcon }}>
					{isConfirmPasswordVisible ? <IoEyeOutline /> : <IoEyeOffOutline />}
				</IconContext.Provider>
			</button>
			<input type="submit" value="Login" aria-label="submit registration form" />
			{isPasswordMatchError ? (
				<p className={styles.errorMessage} role="alert">
					Passwords do not match
				</p>
			) : null}
		</form>
	);
};
