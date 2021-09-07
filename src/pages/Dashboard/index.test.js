import Dashboard from '.';
import { MemoryRouter } from 'react-router-dom';
import { screen } from '@testing-library/react';

jest.mock('../../components/DashboardConsole/index.js', () => () => <section></section>);

describe('Dashboard Page', () => {
	beforeEach(() => {
		renderWithAuth(<Dashboard />, { wrapper: MemoryRouter });
	});

	it('Renders a heading', () => {
		let heading = screen.getByRole('heading', { name: 'greeting' });
		expect(heading).toBeInTheDocument();
		expect(heading.textContent).toContain('Hi, ');
	});

	it('Renders a navigation menu ', () => {
		let nav = screen.getByRole('navigation');
		expect(nav).toBeInTheDocument();
	});

	it('Renders a link to the calendar page', () => {
		let link = screen.getByRole('link', { name: 'calendar page link' });
		expect(link).toBeInTheDocument();
		expect(link.href).toBe('http://localhost/calendar');
	});

	it('Renders a link to the workouts page', () => {
		let link = screen.getByRole('link', { name: 'workouts page link' });
		expect(link).toBeInTheDocument();
		expect(link.href).toBe('http://localhost/workouts');
	});
});
