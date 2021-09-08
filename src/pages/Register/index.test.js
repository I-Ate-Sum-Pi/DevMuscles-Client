import Register from '.';
import { MemoryRouter } from 'react-router-dom';
import { screen } from '@testing-library/react';

describe('Register Page', () => {
	beforeEach(() => {
		renderWithAuthProvider(<Register />, { wrapper: MemoryRouter });
	});

	it('Renders a heading', () => {
		let heading = screen.getByRole('heading');
		expect(heading).toBeInTheDocument();
		expect(heading.textContent).toBe('Register');
	});

	it('Renders a registration form', () => {
		let form = screen.getByRole('form');
		expect(form).toBeInTheDocument();
	});

	it('Renders a go back link', () => {
		let goBackLink = screen.getByRole('link', { name: 'return to landing page' });
		expect(goBackLink).toBeInTheDocument();
		expect(goBackLink.textContent).toBe('Go back');
	});

	it('Renders a link to login page', () => {
		let registLink = screen.getByRole('link', { name: 'go to register page' });
		expect(registLink).toBeInTheDocument();
		expect(registLink.textContent).toBe('Already have an account yet? Login here');
	});
});
