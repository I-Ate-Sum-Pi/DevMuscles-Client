import * as Pages from './pages';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './styles/globals.css';
import { AuthProvider } from './contexts/AuthContext';

export default function App() {
	return (
		<AuthProvider>
			<Switch>
				<Route exact path="/calendar">
					<Pages.Calendar />
				</Route>
				<Route exact path="/dashboard">
					<Pages.Dashboard />
				</Route>
				<Route exact path="/calendar/:date">
					<Pages.Date />
				</Route>
				<Route exact path="/">
					<Pages.Landing />
				</Route>
				<Route exact path="/login">
					<Pages.Login />
				</Route>
				<Route exact path="/profile">
					<Pages.Profile />
				</Route>
				<Route exact path="/progress">
					<Pages.Progress />
				</Route>
				<Route exact path="/register">
					<Pages.Register />
				</Route>
				<Route exact path="/workouts/:workout_id">
					<Pages.Workout />
				</Route>
				<Route exact path="/workouts">
					<Pages.Workouts />
				</Route>
				<Route path="/">
					<Pages.NotFound />
				</Route>
			</Switch>
		</AuthProvider>
	);
}
