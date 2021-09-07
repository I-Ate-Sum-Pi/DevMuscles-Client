import Calendar from '.';
import { MemoryRouter } from 'react-router-dom';
import { screen } from '@testing-library/react';

describe('Calendar Page', () => {
	beforeEach(() => {
		render(<Calendar />, { wrapper: MemoryRouter });
	});

	it('Renders a heading', () => {
		let heading = screen.getByRole('heading');
		expect(heading).toBeInTheDocument();
		expect(heading.textContent).toBe('Hello Calendar!');
	});

	it('Renders a calendar', () => {
		let calendar = screen.getByLabelText('Calendar');
		expect(calendar).toBeInTheDocument();
	});
});
