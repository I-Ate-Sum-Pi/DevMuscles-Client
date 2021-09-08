import React from 'react';
import { NavMenu } from '../../components';
import { DeleteAccount } from '../../layout';

export default () => {
	return (
		<>
			<NavMenu />
			<main>
				<h1>Profile</h1>
				<DeleteAccount />
			</main>
		</>
	);
};
