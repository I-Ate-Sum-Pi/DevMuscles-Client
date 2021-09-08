import Logout from '.';
import { MemoryRouter } from 'react-router-dom';
import { screen } from '@testing-library/react';

describe('Logout Page', () => {
	beforeEach(() => {
		renderWithAuth(<Logout />, { wrapper: MemoryRouter });
	});

	it('Renders a heading', () => {
		let heading = screen.getByRole('heading');
		expect(heading).toBeInTheDocument();
	});

	it('Renders a thanks message ', () => {
		let thanksMessage = screen.getByLabelText('thanks message');
		expect(thanksMessage).toBeInTheDocument();
		expect(thanksMessage).toHaveTextContent('Thanks for using DevMuscles! Come back soon!');
	});

	it('Renders a link to the landing page', () => {
		let link = screen.getByRole('link');
		expect(link).toBeInTheDocument();
		expect(link.href).toBe('http://localhost/');
	});
});
