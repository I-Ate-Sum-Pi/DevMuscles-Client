import NavMenu from '.';
import { screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

describe('Navigation menu', () => {
	beforeEach(() => {
		render(<NavMenu />, { wrapper: MemoryRouter });
	});

	it('Renders a navigation menu', () => {
		let nav = screen.getByRole('navigation');
		expect(nav).toBeInTheDocument();
	});

	it('Renders a list of navigation links', () => {
		let list = screen.getByRole('list');
		expect(list).toBeInTheDocument();
	});

	it('Renders five page links', () => {
		let links = screen.getAllByRole('link');
		expect(links.length).toBe(5);
	});

	it('Renders a logout button', () => {
		let logoutButton = screen.getByRole('button');
		expect(logoutButton).toBeInTheDocument();
	});
});
