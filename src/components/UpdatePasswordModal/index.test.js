import UpdatePasswordModal from '.';
import { act, fireEvent, screen, waitFor, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

describe('UpdatePasswordModal component', () => {
	const mockCloseFn = jest.fn();
	const mockUpdatePassword = jest.fn();
	const mockValue = {
		currentUser: {
			username: 'test',
		},
		updatePassword: mockUpdatePassword,
	};

	it('Is not visible when showModal is false', () => {
		renderWithAuthContext(
			<UpdatePasswordModal showModal={false} closeModal={mockCloseFn} />,
			mockValue,
			{ wrapper: MemoryRouter }
		);
		let modal = screen.queryByLabelText('update password modal');
		expect(modal).not.toBeVisible();
	});

	it('Is visible when showModal is true', () => {
		renderWithAuthContext(
			<UpdatePasswordModal showModal={true} closeModal={mockCloseFn} />,
			mockValue,
			{ wrapper: MemoryRouter }
		);
		const modal = screen.getByLabelText('update password modal');
		expect(modal).toBeInTheDocument();
	});

	it('Renders a button that closes the modal on click', () => {
		renderWithAuthContext(
			<UpdatePasswordModal showModal={true} closeModal={mockCloseFn} />,
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

	it('Renders a form', () => {
		renderWithAuthContext(
			<UpdatePasswordModal showModal={true} closeModal={mockCloseFn} />,
			mockValue,
			{ wrapper: MemoryRouter }
		);
		const form = screen.getByRole('form');
		expect(form).toBeInTheDocument();
	});

	it('Renders a controlled password input', () => {
		renderWithAuthContext(
			<UpdatePasswordModal showModal={true} closeModal={mockCloseFn} />,
			mockValue,
			{ wrapper: MemoryRouter }
		);
		const passwordInput = screen.getByLabelText('Current password:');
		expect(passwordInput).toBeInTheDocument();
		expect(passwordInput).toHaveValue('');
		act(() => {
			fireEvent.change(passwordInput, { target: { value: 'test' } });
		});
		expect(passwordInput).toHaveValue('test');
	});

	it('Renders a controlled new password input', () => {
		renderWithAuthContext(
			<UpdatePasswordModal showModal={true} closeModal={mockCloseFn} />,
			mockValue,
			{ wrapper: MemoryRouter }
		);
		const newPasswordInput = screen.getByLabelText('New password:');
		expect(newPasswordInput).toBeInTheDocument();
		expect(newPasswordInput).toHaveValue('');
		act(() => {
			fireEvent.change(newPasswordInput, { target: { value: 'test' } });
		});
		expect(newPasswordInput).toHaveValue('test');
	});

	it('Renders a controlled confirm new password input', () => {
		renderWithAuthContext(
			<UpdatePasswordModal showModal={true} closeModal={mockCloseFn} />,
			mockValue,
			{ wrapper: MemoryRouter }
		);
		const confirmNewPasswordInput = screen.getByLabelText('Confirm new password:');
		expect(confirmNewPasswordInput).toBeInTheDocument();
		expect(confirmNewPasswordInput).toHaveValue('');
		act(() => {
			fireEvent.change(confirmNewPasswordInput, { target: { value: 'test' } });
		});
		expect(confirmNewPasswordInput).toHaveValue('test');
	});

	it('Renders an error message if passwords do not match', () => {
		renderWithAuthContext(
			<UpdatePasswordModal showModal={true} closeModal={mockCloseFn} />,
			mockValue,
			{ wrapper: MemoryRouter }
		);
		const form = screen.getByRole('form');
		const passwordInput = screen.getByLabelText('Current password:');
		const submitButton = within(form).getByRole('button');
		expect(passwordInput).toHaveValue('');
		expect(submitButton).toBeInTheDocument();
		act(() => {
			fireEvent.change(passwordInput, { target: { value: 'test' } });
		});
		act(() => {
			fireEvent.submit(form);
		});
		const warningMessage = screen.getByRole('alert');
		expect(warningMessage).toBeInTheDocument();
		expect(warningMessage).toHaveTextContent('New passwords do not match');
	});

	// it('Calls the auth deleteAccount function on submit', () => {
	// 	renderWithAuthContext(
	// 		<UpdatePasswordModal showModal={true} closeModal={mockCloseFn} />,
	// 		mockValue,
	// 		{ wrapper: MemoryRouter }
	// 	);
	// 	const form = screen.getByRole('form');
	// 	const usernameInput = screen.getByLabelText('confirm username');
	// 	act(() => {
	// 		fireEvent.change(usernameInput, { target: { value: 'test' } });
	// 	});
	// 	act(() => {
	// 		fireEvent.submit(form);
	// 	});
	// 	expect(mockUpdatePassword).toHaveBeenCalled();
	// });
});
