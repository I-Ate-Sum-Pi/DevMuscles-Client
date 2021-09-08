import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import { AuthContext, AuthProvider } from '../contexts/AuthContext';

const renderWithAuthProvider = (ui, renderOptions) => {
	return render(<AuthProvider>{ui}</AuthProvider>, renderOptions);
};

const renderWithAuthContext = (ui, value, renderOptions) => {
	return render(<AuthContext.Provider value={value}>{ui}</AuthContext.Provider>, renderOptions);
};

global.React = React;
global.render = render;
global.userEvent = userEvent;
global.renderWithAuthProvider = renderWithAuthProvider;
global.renderWithAuthContext = renderWithAuthContext;
