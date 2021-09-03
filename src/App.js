import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './styles/globals.css';

export default function App() {
	return (
		<Switch>
			<Route path="/">
				<h1>Hello World!</h1>
			</Route>
		</Switch>
	);
}
