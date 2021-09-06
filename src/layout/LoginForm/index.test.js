import LoginForm from '.';
import { screen } from '@testing-library/react';

describe('Login form', () => {
	beforeEach(() => {
		render(<LoginForm />);
	});

	it('Renders a form', () => {
		const form = screen.getByRole('form');
		expect(form).toBeInTheDocument();
	});

	it('Renders a email field', () => {
		const emailInput = screen.getByLabelText('Email:');
		expect(emailInput).toBeInTheDocument();
	});

	it('Renders a password field', () => {
		const passwordInput = screen.getByLabelText('Password:');
		expect(passwordInput).toBeInTheDocument();
	});

	it('Renders a show password button that toggles password input visibility', () => {
		const togglePasswordButton = screen.getByRole('button', { name: 'toggle password visibilty' });
		expect(togglePasswordButton).toBeInTheDocument();
	});

	it('Show password button toggles password visibility on click', () => {
		const togglePasswordButton = screen.getByRole('button', { name: 'toggle password visibilty' });
		const passwordInput = screen.getByLabelText('Password:');

		expect(passwordInput.type).toBe('password');
		expect(togglePasswordButton.textContent).toBe('Show password');

		userEvent.click(togglePasswordButton);
		expect(passwordInput.type).toBe('text');
		expect(togglePasswordButton.textContent).toBe('Hide password');

		userEvent.click(togglePasswordButton);
		expect(passwordInput.type).toBe('password');
		expect(togglePasswordButton.textContent).toBe('Show password');
	});
});
