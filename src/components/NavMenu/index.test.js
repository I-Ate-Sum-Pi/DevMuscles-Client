import NavMenu from '.';
import { screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

describe('Navigation menu', () => {
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

	it('Renders five page links', () => {
		const links = screen.getAllByRole('link');
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

	it('Clicking the logout button logs the user out', () => {
		localStorage.setItem('token', 'testtoken');
		localStorage.setItem('id', 'testid');
		localStorage.setItem('username', 'test username');
		localStorage.setItem('email', 'test@example.com');

		let token = localStorage.getItem('token');
		let username = localStorage.getItem('username');
		let email = localStorage.getItem('email');
		let id = localStorage.getItem('id');

		expect(token).toBe('testtoken');
		expect(username).toBe('test username');
		expect(email).toBe('test@example.com');
		expect(id).toBe('testid');

		const toggleNavVisibilityButton = screen.getByRole('button', {
			name: 'toggle navigation menu visibility',
		});
		userEvent.click(toggleNavVisibilityButton);
		const logoutButton = screen.getByRole('button', { name: 'logout' });
		userEvent.click(logoutButton);

		token = localStorage.getItem('token');
		username = localStorage.getItem('username');
		email = localStorage.getItem('email');
		id = localStorage.getItem('id');
		expect(token).toBeNull();
		expect(username).toBeNull();
		expect(email).toBeNull();
		expect(id).toBeNull();
	});
});
