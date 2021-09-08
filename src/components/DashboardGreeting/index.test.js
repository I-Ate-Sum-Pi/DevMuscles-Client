import DashboardGreeting from '.';
import { screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

describe('DashboardGreeting component', () => {
	it('Greets the user', () => {
		renderWithAuthContext(
			<DashboardGreeting />,
			{ currentUser: { username: 'test user' } },
			{ wrapper: MemoryRouter }
		);
		const heading = screen.getByRole('heading');
		expect(heading).toBeInTheDocument();
		expect(heading).toHaveTextContent('Hi, test user!');
	});

	it('Renders and empty greeting if there is no user', () => {
		renderWithAuthContext(<DashboardGreeting />, { currentUser: null }, { wrapper: MemoryRouter });

		const heading = screen.getByRole('heading');
		expect(heading).toBeInTheDocument();
		expect(heading).toHaveTextContent('Hi, !');
	});
});
