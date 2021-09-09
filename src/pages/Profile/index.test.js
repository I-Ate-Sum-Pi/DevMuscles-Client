import Profile from '.';
import { MemoryRouter } from 'react-router-dom';
import { screen } from '@testing-library/react';

jest.mock('../../Components/ProfileInfo/index.js', () => () => (
	<section aria-label="user information"></section>
));

jest.mock('../../Layout/UpdatePassword/index.js', () => () => (
	<section aria-label="update password"></section>
));

jest.mock('../../Layout/UpdateEmail/index.js', () => () => (
	<section aria-label="update email"></section>
));

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

	it('Renders a profile info section', () => {
		let userInfo = screen.getByLabelText('user information');
		expect(userInfo).toBeInTheDocument();
	});

	it('Renders a update email section', () => {
		const updateEmail = screen.getByLabelText('update email');
		expect(updateEmail).toBeInTheDocument();
	});

	it('Renders a update password section', () => {
		const updatePassword = screen.getByLabelText('update password');
		expect(updatePassword).toBeInTheDocument();
	});

	it('Renders a delete account section', () => {
		const deleteAccount = screen.getByLabelText('delete account');
		expect(deleteAccount).toBeInTheDocument();
	});
});
