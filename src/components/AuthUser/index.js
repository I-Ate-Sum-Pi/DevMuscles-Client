import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default () => {
	const { currentUser } = useAuth();
	const { push } = useHistory();
	const { pathname } = useLocation();

	useEffect(() => {
		const unprotectedPaths = ['/', '/login', '/register'];
		function redirectUser() {
			if (unprotectedPaths.includes(pathname) && currentUser) {
				push('/dashboard');
			}
			if (!unprotectedPaths.includes(pathname) && !currentUser) {
				push('/');
			}
		}
		redirectUser();
	}, [pathname, currentUser]);
	return <></>;
};
