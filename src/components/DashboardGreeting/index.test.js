import DashboardGreeting from '.';
import { screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

describe('Navigation menu', () => {
	beforeEach(() => {
		renderWithAuth(<DashboardGreeting />, { wrapper: MemoryRouter });
	});

	it('Renders a greeting', () => {
		const heading = screen.getByRole('heading');
		expect(heading).toBeInTheDocument();
	});
});
