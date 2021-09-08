import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import FadeLoader from 'react-spinners/FadeLoader';
import styles from './styles.module.css';
import { Link } from 'react-router-dom';


export default () => {
	const [workouts, setWorkouts] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [isError, setIsError] = useState(false);
	const { currentUser } = useAuth();

	useEffect(() => {
		const fetchWorkouts = async () => {
			try {
				if (!currentUser) {
					return;
				}
				const API_ROOT = process.env.REACT_APP_API_ROOT
					? process.env.REACT_APP_API_ROOT
					: 'https://devmuscles.herokuapp.com';
				const { data } = await axios.get(`${API_ROOT}/users/${currentUser.id}/workouts`, {
					headers: { Authorization: `Token ${currentUser.token}` },
				});
				setWorkouts(data);
				setIsLoading(false);
			} catch (err) {
				setIsError(true);
			}
		};
		fetchWorkouts();
	}, [currentUser]);

    const renderWorkouts = () => {
		return isError ? (
			<p role="alert">
				Oops! Something went wrong. <br /> Please refresh or try again later.
			</p>
		) : isLoading ? (
			<FadeLoader data-testid="spinner" loading={isLoading} size={50} />
		) : (
			workouts.map((workout, i) => (
				<div className = {styles.workouts} key={i}>
					{workout['name']}
				</div>
			))
		);
	};

	return (
		<>
            <div className = {styles.workouts_container}>{renderWorkouts()}</div>
            <Link to="/workout">New workout</Link>
		</>
	);
};