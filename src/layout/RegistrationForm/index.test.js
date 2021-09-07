import RegistrationForm from '.';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

describe('Registration form', () => {
	beforeEach(() => {
		act(() => {
			renderWithAuth(<RegistrationForm />, { wrapper: MemoryRouter });
		});
	});

	it('Renders a form', () => {
		const form = screen.getByRole('form');
		expect(form).toBeInTheDocument();
	});

	it('Renders a controlled username field', () => {
		const usernameInput = screen.getByLabelText('Username:');
		expect(usernameInput).toBeInTheDocument();
		act(() => {
			fireEvent.change(usernameInput, { target: { value: 'test username' } });
		});
		expect(usernameInput).toHaveValue('test username');
	});

	it('Renders a email field', () => {
		const emailInput = screen.getByLabelText('Email:');
		expect(emailInput).toBeInTheDocument();
		act(() => {
			fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
		});
		expect(emailInput).toHaveValue('test@example.com');
	});

	it('Renders a password field', () => {
		const passwordInput = screen.getByLabelText('Password:');
		expect(passwordInput).toBeInTheDocument();
		act(() => {
			fireEvent.change(passwordInput, { target: { value: 'test' } });
		});
		expect(passwordInput).toHaveValue('test');
	});

	it('Renders a confirm password field', () => {
		const confirmPasswordInput = screen.getByLabelText('Confirm password:');
		expect(confirmPasswordInput).toBeInTheDocument();
		act(() => {
			fireEvent.change(confirmPasswordInput, { target: { value: 'test' } });
		});
		expect(confirmPasswordInput).toHaveValue('test');
	});

	it('Renders a submit button', () => {
		const submitButton = screen.getByRole('button', { name: 'submit registration form' });
		expect(submitButton).toBeInTheDocument();
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

	it('Renders a show password button that toggles confirm password input visibility', () => {
		const toggleConfirmPasswordButton = screen.getByRole('button', {
			name: 'toggle confirm password visibilty',
		});
		expect(toggleConfirmPasswordButton).toBeInTheDocument();
	});

	it('Show confirm password button toggles confirm password visibility on click', () => {
		const toggleConfirmPasswordButton = screen.getByRole('button', {
			name: 'toggle confirm password visibilty',
		});
		const confirmPasswordInput = screen.getByLabelText('Confirm password:');

		expect(confirmPasswordInput.type).toBe('password');
		expect(toggleConfirmPasswordButton.textContent).toBe('Show password');

		userEvent.click(toggleConfirmPasswordButton);
		expect(confirmPasswordInput.type).toBe('text');
		expect(toggleConfirmPasswordButton.textContent).toBe('Hide password');

		userEvent.click(toggleConfirmPasswordButton);
		expect(confirmPasswordInput.type).toBe('password');
		expect(toggleConfirmPasswordButton.textContent).toBe('Show password');
	});

	// it("renders an error message if passwords don't match", async () => {
	// 	const usernameInput = screen.getByLabelText('username field');
	// 	const emailInput = screen.getByLabelText('email field');
	// 	const passwordInput = screen.getByLabelText('password field');
	// 	const confirmPasswordInput = screen.getByLabelText('confirm password field');
	// 	const submitButton = screen.getByRole('button', { name: 'submit registration form' });

	// 	fireEvent.change(usernameInput, { target: { value: 'username' } });
	// 	fireEvent.change(emailInput, { target: { value: 'username@example.com' } });
	// 	fireEvent.change(passwordInput, { target: { value: 'TestPassword' } });
	// 	fireEvent.change(confirmPasswordInput, { target: { value: 'userTestPasswordErrorname' } });

	// 	fireEvent.click(submitButton);

	// 	const errorMessage = await screen.findByRole('alert');
	// 	expect(errorMessage).toBeInTheDocument();
	// 	expect(errorMessage.textContent).toBe('Passwords do not match');
	// });
});
