import DashboardConsole from '.';
import { screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';

jest.mock('axios');

describe('DashboardConsole component', () => {
	beforeEach(() => {
		jest.resetAllMocks();
	});

	it('Renders an add workout link', async () => {
		axios.get.mockResolvedValueOnce({ data: [{ name: 'mock workout' }] });
		renderWithAuth(<DashboardConsole />, { wrapper: MemoryRouter });
		await waitFor(() => expect(axios.get).toHaveBeenCalled());

		const link = screen.getByRole('link', { name: 'add workout today' });
		expect(link).toBeInTheDocument();
	});

	it("Renders today's date", async () => {
		axios.get.mockResolvedValueOnce({ data: [{ name: 'mock workout' }] });
		renderWithAuth(<DashboardConsole />, { wrapper: MemoryRouter });
		await waitFor(() => expect(axios.get).toHaveBeenCalled());

		const date = screen.getByLabelText("today's date");
		expect(date).toBeInTheDocument();
	});

	it("Renders today's date", async () => {
		axios.get.mockResolvedValueOnce({ data: [{ name: 'mock workout' }] });
		renderWithAuth(<DashboardConsole />, { wrapper: MemoryRouter });
		await waitFor(() => expect(axios.get).toHaveBeenCalled());

		const heading = screen.getByRole('heading', { name: "today's schedule" });
		expect(heading).toBeInTheDocument();
	});

	// it('Renders a spinner whilst loading fetch data', async () => {
	// 	axios.get.mockResolvedValueOnce({ data: [{ name: 'mock workout' }] });
	// 	renderWithAuth(<DashboardConsole />, { wrapper: MemoryRouter });
	// 	const spinner = screen.getByTestId('spinner');
	// 	expect(spinner).toBeInTheDocument();

	// 	await waitFor(() => expect(axios.get).toHaveBeenCalled());
	// });

	it('Renders an error message on a failed fetch', async () => {
		axios.get.mockRejectedValueOnce({ error: 'test error' });
		renderWithAuth(<DashboardConsole />, { wrapper: MemoryRouter });
		await waitFor(() => expect(axios.get).toHaveBeenCalled());

		const errorMessage = screen.getByRole('alert');
		expect(errorMessage).toBeInTheDocument();
		expect(errorMessage.textContent).toContain('Oops! Something went wrong.');
	});
});
