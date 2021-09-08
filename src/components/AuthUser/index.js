import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default () => {
	const { currentUser } = useAuth();
	const { push } = useHistory();
	const { pathname } = useLocation();

	useEffect(() => {
		const redirectIfLoggedInPaths = ['/', '/login', '/register'];
		const protectedPaths = ['/dashboard', '/profile', '/calendar', '/progress', '/workouts'];
		function redirectUser() {
			if (redirectIfLoggedInPaths.includes(pathname) && currentUser) {
				push('/dashboard');
			}
			if (protectedPaths.findIndex((path) => path.includes(pathname)) > -1 && !currentUser) {
				push('/');
			}
		}
		redirectUser();
	}, [pathname, currentUser]);
	return <></>;
};
