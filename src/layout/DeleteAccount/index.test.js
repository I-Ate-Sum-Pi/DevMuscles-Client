import DeleteAccount from '.';
import { MemoryRouter } from 'react-router-dom';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

jest.mock('../../components/DeleteAccountModal/index.js', () => () => (
	<section aria-label="delete account modal"></section>
));

describe('DeleteAccount layout component', () => {
	beforeEach(() => {
		jest.resetAllMocks();
		act(() => {
			renderWithAuthProvider(<DeleteAccount />, { wrapper: MemoryRouter });
		});
	});

	it('Renders a modal', () => {
		const modal = screen.getByLabelText('delete account modal');
		expect(modal).toBeInTheDocument();
	});

	it('Renders a warning message', () => {
		const warning = screen.getByLabelText('delete account warning');
		expect(warning).toBeInTheDocument();
	});

	it('Renders a delete account button', () => {
		const button = screen.getByRole('button');
		expect(button).toBeInTheDocument();
		expect(button).toHaveTextContent('Delete Account');
	});
});
