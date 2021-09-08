import ProfileInfo from '.';
import { screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

describe('ProfileInfo Component', () => {
	const mockContextValue = {
		currentUser: {
			username: 'test',
			email: 'test@example.com',
		},
	};
	beforeEach(() => {
		renderWithAuthContext(<ProfileInfo />, mockContextValue, { wrapper: MemoryRouter });
	});

	it('Renders a user information section', () => {
		const section = screen.getByLabelText('user information');
		expect(section).toBeInTheDocument();
	});

	it('Renders the users username', () => {
		const username = screen.getByLabelText('username');
		expect(username).toBeInTheDocument();
		expect(username).toHaveTextContent(`Username: ${mockContextValue.currentUser.username}`);
	});

	it('Renders the users email', () => {
		const email = screen.getByLabelText('email');
		expect(email).toBeInTheDocument();
		expect(email).toHaveTextContent(`Email: ${mockContextValue.currentUser.email}`);
	});
});
