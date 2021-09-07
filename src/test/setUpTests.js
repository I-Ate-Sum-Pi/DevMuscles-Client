import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import { AuthProvider } from '../contexts/AuthContext';

const renderWithAuth = (ui, renderOptions) => {
	return render(<AuthProvider>{ui}</AuthProvider>, renderOptions);
};

global.React = React;
global.render = render;
global.userEvent = userEvent;
global.renderWithAuth = renderWithAuth;
