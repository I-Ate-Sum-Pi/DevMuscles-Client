import Calendar from '.';
import { act, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';

jest.mock('axios');

describe('Calendar', () => {
	const mockValue = {
		currentUser: {
			id: 'test',
		},
	};

	beforeEach(() => {
		jest.resetAllMocks();
	});

	it('Renders a toggle previous year button', () => {
		axios.get.mockResolvedValueOnce({ data: [] });
		act(() => {
			renderWithAuthContext(<Calendar />, mockValue, { wrapper: MemoryRouter });
		});
		waitFor(() => {
			expect(axios.get).toHaveBeenCalled();
		});
		const togglePrevYearButton = screen.getByText('«');
		expect(togglePrevYearButton).toBeInTheDocument();
	});

	it('Renders a toggle previous month button', () => {
		axios.get.mockResolvedValueOnce({ data: [] });
		act(() => {
			renderWithAuthContext(<Calendar />, mockValue, { wrapper: MemoryRouter });
		});
		waitFor(() => {
			expect(axios.get).toHaveBeenCalled();
		});
		const togglePrevMonthButton = screen.getByText('‹');
		expect(togglePrevMonthButton).toBeInTheDocument();
	});

	it('Renders a toggle next year button', () => {
		axios.get.mockResolvedValueOnce({ data: [] });
		act(() => {
			renderWithAuthContext(<Calendar />, mockValue, { wrapper: MemoryRouter });
		});
		waitFor(() => {
			expect(axios.get).toHaveBeenCalled();
		});
		const toggleNextYearButton = screen.getByText('»');
		expect(toggleNextYearButton).toBeInTheDocument();
	});

	it('Renders a toggle next month button', () => {
		axios.get.mockResolvedValueOnce({ data: [] });
		act(() => {
			renderWithAuthContext(<Calendar />, mockValue, { wrapper: MemoryRouter });
		});
		waitFor(() => {
			expect(axios.get).toHaveBeenCalled();
		});
		const toggleNextMonthButton = screen.getByText('›');
		expect(toggleNextMonthButton).toBeInTheDocument();
	});

	it('Renders the days abbreivation on the calendar', () => {
		axios.get.mockResolvedValueOnce({ data: [] });
		act(() => {
			renderWithAuthContext(<Calendar />, mockValue, { wrapper: MemoryRouter });
		});
		waitFor(() => {
			expect(axios.get).toHaveBeenCalled();
		});
		const DayAbbreviation = screen.getByText('Mon');
		expect(DayAbbreviation).toBeInTheDocument();
	});

	it('Renders the month at the top of the calendar', () => {
		axios.get.mockResolvedValueOnce({ data: [] });
		act(() => {
			renderWithAuthContext(<Calendar />, mockValue, { wrapper: MemoryRouter });
		});
		waitFor(() => {
			expect(axios.get).toHaveBeenCalled();
		});
		const MonthAtTopOfPage = screen.getByText('September 2021');
		expect(MonthAtTopOfPage).toBeInTheDocument();
	});
});
