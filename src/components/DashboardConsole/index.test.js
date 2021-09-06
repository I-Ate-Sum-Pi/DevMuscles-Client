import DashboardConsole from '.';
import { screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import axios from 'axios';

jest.mock('axios');

describe('Navigation menu', () => {
	beforeEach(() => {
		jest.resetAllMocks();
	});

	it('Renders an add workout link', async () => {
		axios.get.mockResolvedValueOnce({ data: [{ name: 'mock workout' }] });
		render(<DashboardConsole />, { wrapper: MemoryRouter });
		await waitFor(() => expect(axios.get).toHaveBeenCalled());

		const link = screen.getByRole('link', { name: 'add workout today' });
		expect(link).toBeInTheDocument();
	});

	it("Renders today's date", async () => {
		axios.get.mockResolvedValueOnce({ data: [{ name: 'mock workout' }] });
		render(<DashboardConsole />, { wrapper: MemoryRouter });
		await waitFor(() => expect(axios.get).toHaveBeenCalled());

		const date = screen.getByLabelText("today's date");
		expect(date).toBeInTheDocument();
	});

	it("Renders today's date", async () => {
		axios.get.mockResolvedValueOnce({ data: [{ name: 'mock workout' }] });
		render(<DashboardConsole />, { wrapper: MemoryRouter });
		await waitFor(() => expect(axios.get).toHaveBeenCalled());

		const heading = screen.getByRole('heading', { name: "today's schedule" });
		expect(heading).toBeInTheDocument();
	});

	// it('Renders a spinner whilst loading fetch data', async () => {
	// 	axios.get.mockResolvedValueOnce({ data: [{ name: 'mock workout' }] });
	// 	render(<DashboardConsole />, { wrapper: MemoryRouter });
	// 	const spinner = screen.getByTestId('spinner');
	// 	expect(spinner).toBeInTheDocument();

	// 	await waitFor(() => expect(axios.get).toHaveBeenCalled());
	// });
});
