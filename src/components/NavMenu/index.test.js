import NavMenu from '.';
import { screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

describe('Navigation menu', () => {
	beforeEach(() => {
		render(<NavMenu />, { wrapper: MemoryRouter });
	});

	it('Renders a toggle visibilty button', () => {
		const toggleNavVisibilityButton = screen.getByRole('button', {
			name: 'toggle navigation menu visibility',
		});
		expect(toggleNavVisibilityButton).toBeInTheDocument();
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
		let logoutButton = screen.getByRole('button', { name: 'logout' });
		expect(logoutButton).toBeInTheDocument();
	});

	it('Clicking the toggle nav button brings the nav into view', () => {
		const toggleNavVisibilityButton = screen.getByRole('button', {
			name: 'toggle navigation menu visibility',
		});
		const nav = screen.getByRole('navigation');

		expect(nav.style.left).toBe('-100%');

		userEvent.click(toggleNavVisibilityButton);
		expect(nav.style.left).toBe('0px');

		userEvent.click(toggleNavVisibilityButton);
		expect(nav.style.left).toBe('-100%');
	});
});
