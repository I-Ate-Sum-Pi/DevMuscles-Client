import Landing from '.';
import { screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

describe('Profile Page', () => {
	beforeEach(() => {
		render(<Landing />, { wrapper: MemoryRouter });
	});

	it('Renders a delete account button', () => {
		let heading = screen.getByRole('heading');
		expect(heading).toBeInTheDocument();
		expect(heading.textContent).toBe('DevMuscles');
	});

	it('Renders a login button', () => {
		let loginButton = screen.getByRole('link', { name: 'login link' });
		expect(loginButton).toBeInTheDocument();
		expect(loginButton.textContent).toBe('Login');
	});

	it('Renders a register button', () => {
		let registerButton = screen.getByRole('link', { name: 'registration link' });
		expect(registerButton).toBeInTheDocument();
		expect(registerButton.textContent).toBe('Register');
	});
});
