import NavMenu from '.';
import { screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

describe('NavMenu Component', () => {
	beforeEach(() => {
		renderWithAuth(<NavMenu />, { wrapper: MemoryRouter });
	});

	it('Renders a toggle visibilty button', () => {
		const toggleNavVisibilityButton = screen.getByRole('button', {
			name: 'toggle navigation menu visibility',
		});
		expect(toggleNavVisibilityButton).toBeInTheDocument();
	});

	it('Renders a navigation menu', () => {
		const nav = screen.getByRole('navigation');
		expect(nav).toBeInTheDocument();
	});

	it('Renders a list of navigation links', () => {
		const list = screen.getByRole('list');
		expect(list).toBeInTheDocument();
	});

	it('Renders a list of five page links', () => {
		const list = screen.getByRole('list');
		const links = within(list).getAllByRole('link');
		expect(links.length).toBe(5);
	});

	it('Renders a logout button', () => {
		const logoutButton = screen.getByRole('button', { name: 'logout' });
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
