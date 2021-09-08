import UpdatePassword from '.';
import { MemoryRouter } from 'react-router-dom';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

jest.mock('../../components/UpdatePasswordModal/index.js', () => () => (
	<section aria-label="update password modal"></section>
));

describe('UpdatePassword layout component', () => {
	beforeEach(() => {
		jest.resetAllMocks();
		act(() => {
			renderWithAuthProvider(<UpdatePassword />, { wrapper: MemoryRouter });
		});
	});

	it('Renders a modal', () => {
		const modal = screen.getByLabelText('update password modal');
		expect(modal).toBeInTheDocument();
	});

	it('Renders a descriptive message', () => {
		const warning = screen.getByLabelText('update password explanation');
		expect(warning).toBeInTheDocument();
	});

	it('Renders a update password button', () => {
		const button = screen.getByRole('button');
		expect(button).toBeInTheDocument();
		expect(button).toHaveTextContent('Update Password');
	});
});
