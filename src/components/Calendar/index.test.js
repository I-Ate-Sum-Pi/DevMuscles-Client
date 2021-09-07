import Calendar from '.';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

describe('Calendar', () => {
	beforeEach(() => {
		render(<Calendar />, { wrapper: MemoryRouter });
	});
});
