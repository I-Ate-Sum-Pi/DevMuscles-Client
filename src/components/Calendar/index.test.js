import Calendar from '.';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

describe('Calendar', () => {
	beforeEach(() => {
		render(<Calendar />, { wrapper: MemoryRouter });
	});

	it('Renders a toggle previous year button', () => {
		const togglePrevYearButton = screen.getByText('«');
		expect(togglePrevYearButton).toBeInTheDocument();
	});

	it('Renders a toggle previous month button', () => {
		const togglePrevMonthButton = screen.getByText('‹');
		expect(togglePrevMonthButton).toBeInTheDocument();
	});

	it('Renders a toggle next year button', () => {
		const toggleNextMonthButton = screen.getByText('»');
		expect(toggleNextMonthButton).toBeInTheDocument();
	});

	it('Renders a toggle next month button', () => {
		const toggleNextMonthButton = screen.getByText('›');
		expect(toggleNextMonthButton).toBeInTheDocument();
	});
});
