import DeleteAccountModal from '.';
import { act, fireEvent, screen, waitFor, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

describe('DeleteAccountModal component', () => {
	const mockCloseFn = jest.fn();
	const mockDeleteAccountFn = jest.fn();
	const mockValue = {
		currentUser: {
			username: 'test',
		},
		deleteAccount: mockDeleteAccountFn,
	};

	it('Is not visible when showModal is false', () => {
		renderWithAuthContext(
			<DeleteAccountModal showModal={false} closeModal={mockCloseFn} />,
			mockValue,
			{ wrapper: MemoryRouter }
		);
		let modal = screen.queryByLabelText('delete account modal');
		expect(modal).not.toBeVisible();
	});

	it('Is visible when showModal is true', () => {
		renderWithAuthContext(
			<DeleteAccountModal showModal={true} closeModal={mockCloseFn} />,
			mockValue,
			{ wrapper: MemoryRouter }
		);
		const modal = screen.getByLabelText('delete account modal');
		expect(modal).toBeInTheDocument();
	});

	it('Renders a button that closes the modal on click', () => {
		renderWithAuthContext(
			<DeleteAccountModal showModal={true} closeModal={mockCloseFn} />,
			mockValue,
			{ wrapper: MemoryRouter }
		);

		const button = screen.getByRole('button', { name: 'close modal' });
		expect(button).toBeInTheDocument();

		act(() => {
			userEvent.click(button);
		});
		expect(mockCloseFn).toHaveBeenCalled();
	});

	it('Renders a warning message', () => {
		renderWithAuthContext(
			<DeleteAccountModal showModal={true} closeModal={mockCloseFn} />,
			mockValue,
			{ wrapper: MemoryRouter }
		);

		const warning = screen.getByRole('alert');
		expect(warning).toHaveTextContent('WARNING! This action is irrevesisble');
	});

	it('Renders a form', () => {
		renderWithAuthContext(
			<DeleteAccountModal showModal={true} closeModal={mockCloseFn} />,
			mockValue,
			{ wrapper: MemoryRouter }
		);
		const form = screen.getByRole('form');
		expect(form).toBeInTheDocument();
	});

	it('Renders a controlled username input', () => {
		renderWithAuthContext(
			<DeleteAccountModal showModal={true} closeModal={mockCloseFn} />,
			mockValue,
			{ wrapper: MemoryRouter }
		);
		const usernameInput = screen.getByLabelText('confirm username');
		expect(usernameInput).toBeInTheDocument();
		expect(usernameInput).toHaveValue('');
		act(() => {
			fireEvent.change(usernameInput, { target: { value: 'test username' } });
		});
		expect(usernameInput).toHaveValue('test username');
	});

	it('Disables the sumbit button if the username is incorrect', () => {
		renderWithAuthContext(
			<DeleteAccountModal showModal={true} closeModal={mockCloseFn} />,
			mockValue,
			{ wrapper: MemoryRouter }
		);
		const form = screen.getByRole('form');
		const usernameInput = screen.getByLabelText('confirm username');
		const submitButton = within(form).getByRole('button');
		expect(usernameInput).toHaveValue('');
		expect(submitButton).toBeInTheDocument();
		expect(submitButton).toBeDisabled();
		act(() => {
			fireEvent.change(usernameInput, { target: { value: 'test' } });
		});
		expect(submitButton).not.toBeDisabled();
	});

	it('Calls the auth deleteAccount function on submit', () => {
		renderWithAuthContext(
			<DeleteAccountModal showModal={true} closeModal={mockCloseFn} />,
			mockValue,
			{ wrapper: MemoryRouter }
		);
		const form = screen.getByRole('form');
		const usernameInput = screen.getByLabelText('confirm username');
		act(() => {
			fireEvent.change(usernameInput, { target: { value: 'test' } });
		});
		act(() => {
			fireEvent.submit(form);
		});
		expect(mockDeleteAccountFn).toHaveBeenCalled();
	});
});
