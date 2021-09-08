import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

export default () => {
	const { currentUser } = useAuth();
	return <h1 aria-label="greeting">Hi, {currentUser ? currentUser.username : null}!</h1>;
};
