import NotFound from '.';
import { MemoryRouter } from 'react-router-dom';
import { screen } from '@testing-library/react';

describe('NotFound Page', () => {
	beforeEach(() => {
		renderWithAuthProvider(<NotFound />, { wrapper: MemoryRouter });
	});

	it('Renders a heading', () => {
		let heading = screen.getByRole('heading');
		expect(heading).toBeInTheDocument();
	});

	it('Renders a link to the landing page', () => {
		let link = screen.getByRole('link');
		expect(link).toBeInTheDocument();
		expect(link.href).toBe('http://localhost/');
	});
});
