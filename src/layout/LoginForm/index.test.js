import LoginForm from '.';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

describe('LoginForm layout component', () => {
	beforeEach(() => {
		act(() => {
			renderWithAuth(<LoginForm />, { wrapper: MemoryRouter });
		});
	});

	it('Renders a form', () => {
		const form = screen.getByRole('form');
		expect(form).toBeInTheDocument();
	});

	it('Renders a controlled username field', () => {
		const usernameInput = screen.getByLabelText('username field');
		expect(usernameInput).toBeInTheDocument();
		act(() => {
			fireEvent.change(usernameInput, { target: { value: 'test username' } });
		});
		expect(usernameInput).toHaveValue('test username');
	});

	it('Renders a controlled password field', () => {
		const passwordInput = screen.getByLabelText('Password:');
		expect(passwordInput).toBeInTheDocument();
		act(() => {
			fireEvent.change(passwordInput, { target: { value: 'test password' } });
		});
		expect(passwordInput).toHaveValue('test password');
	});

	it('Renders a submit button', () => {
		const submitButton = screen.getByRole('button', { name: 'submit login form' });
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
});
