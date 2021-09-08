import Calendar from '.';
import { MemoryRouter } from 'react-router-dom';
import { screen } from '@testing-library/react';

jest.mock('../../components/Calendar/index.js', () => () => (
	<section aria-label="Calendar"></section>
));

describe('Calendar Page', () => {
	beforeEach(() => {
		renderWithAuthProvider(<Calendar />, { wrapper: MemoryRouter });
	});

	it('Renders a heading', () => {
		const heading = screen.getByRole('heading');
		expect(heading).toBeInTheDocument();
		expect(heading.textContent).toBe('Your Workout Calendar');
	});

	it('Renders a calendar', () => {
		const calendar = screen.getByLabelText('Calendar');
		expect(calendar).toBeInTheDocument();
	});
});
