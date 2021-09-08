import Profile from '.';
import { MemoryRouter } from 'react-router-dom';
import { screen } from '@testing-library/react';

jest.mock('../../Layout/DeleteAccount/index.js', () => () => (
	<section aria-label="delete account"></section>
));

describe('Profile Page', () => {
	beforeEach(() => {
		render(<Profile />, { wrapper: MemoryRouter });
	});

	it('Renders a heading', () => {
		let heading = screen.getByRole('heading');
		expect(heading).toBeInTheDocument();
	});

	it('Renders a navigation menu', () => {
		let nav = screen.getByRole('navigation');
		expect(nav).toBeInTheDocument();
	});

	it('Renders a delete account section', () => {
		const deleteAccount = screen.getByLabelText('delete account');
		expect(deleteAccount).toBeInTheDocument();
	});
});
