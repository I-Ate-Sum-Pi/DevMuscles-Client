import Login from '.';
import { MemoryRouter } from 'react-router-dom';
import { screen } from '@testing-library/react';

describe('Login Page', () => {
	beforeEach(() => {
		renderWithAuthProvider(<Login />, { wrapper: MemoryRouter });
	});

	it('Renders a heading', () => {
		let heading = screen.getByRole('heading');
		expect(heading).toBeInTheDocument();
		expect(heading.textContent).toBe('Login');
	});

	it('Renders a login form', () => {
		let form = screen.getByRole('form');
		expect(form).toBeInTheDocument();
	});

	it('Renders a go back link', () => {
		let goBackLink = screen.getByRole('link', { name: 'return to landing page' });
		expect(goBackLink).toBeInTheDocument();
		expect(goBackLink.textContent).toBe('Go back');
	});

	it('Renders a link to registration page', () => {
		let registLink = screen.getByRole('link', { name: 'go to register page' });
		expect(registLink).toBeInTheDocument();
		expect(registLink.textContent).toBe("Don't have an account yet? Register here");
	});
});
