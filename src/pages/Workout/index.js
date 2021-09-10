import axios from 'axios';
import FadeLoader from 'react-spinners/FadeLoader';
import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';
import { useAuth } from '../../contexts/AuthContext';
import { NavMenu } from '../../components';
import { IconContext } from 'react-icons';
import {
	IoAddCircleOutline,
	IoCreate,
	IoCloseCircle,
	IoCloseCircleOutline,
	IoArrowBackCircleOutline,
} from 'react-icons/io5';
import { Link, useParams } from 'react-router-dom';

export default () => {
	const { workout_id } = useParams();
	const [exercises, setExercises] = useState([]);
	const [workout, setWorkout] = useState({});
	const [exerciseId, setExerciseId] = useState('');
	const [isLoading, setIsLoading] = useState(true);
	const [isError, setIsError] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [updateModalOpen, setUpdateModalOpen] = useState(false);
	const { currentUser } = useAuth();
	const [formData, setFormData] = useState({
		name: '',
		reps: '',
		weight: '',
	});
	const [updateData, setUpdateData] = useState({
		name: '',
		reps: '',
		weight: '',
	});

	const handleInputChange = (e) => {
		setFormData((prevState) => {
			return { ...prevState, [e.target.id]: e.target.value };
		});
	};
	const handleUpdateChange = (e) => {
		setUpdateData((prevState) => {
			return { ...prevState, [e.target.id]: e.target.value };
		});
	};

	const API_ROOT = process.env.REACT_APP_API_ROOT
		? process.env.REACT_APP_API_ROOT
		: 'https://devmuscles.herokuapp.com';

	const fetchExercises = async () => {
		try {
			const { data } = await axios.get(
				`${API_ROOT}/users/${currentUser.id}/workouts/${workout_id}/exercises`,
				{
					headers: { Authorization: `Token ${currentUser.token}` },
				}
			);
			setExercises(data);
			setIsLoading(false);
		} catch (err) {
			setIsError(true);
		}
	};

	const fetchWorkoutData = async () => {
		try {
			const { data } = await axios.get(
				`${API_ROOT}/users/${currentUser.id}/workouts/${workout_id}`,
				{
					headers: { Authorization: `Token ${currentUser.token}` },
				}
			);
			setWorkout(data);
		} catch (err) {
			setIsError(true);
		}
	};

	const newExercise = async () => {
		try {
			const { new_data } = await axios.post(
				`${API_ROOT}/users/${currentUser.id}/workouts/${workout_id}/exercises`,
				formData,
				{
					headers: { Authorization: `Token ${currentUser.token}` },
				}
			);
		} catch (err) {
			setIsError(true);
		}
	};

	const openUpdateForm = (exercise) => {
		setExerciseId(exercise.id);
		setUpdateData({
			name: exercise.name,
			reps: exercise.reps,
			weight: exercise.weight,
		});
		setUpdateModalOpen(true);
	};
	const updateExercise = async () => {
		try {
			await axios.put(
				`${API_ROOT}/users/${currentUser.id}/workouts/${workout_id}/exercises/${exerciseId}`,
				updateData,
				{
					headers: { Authorization: `Token ${currentUser.token}` },
				}
			);
		} catch (err) {
			setIsError(true);
		}
	};
	useEffect(() => {
		fetchExercises();
		fetchWorkoutData();
	}, [currentUser]);

	const renderExercises = () => {
		return isError ? (
			<p role="alert">
				Oops! Something went wrong. <br /> Please refresh or try again later.
			</p>
		) : isLoading ? (
			<FadeLoader data-testid="spinner" loading={isLoading} size={50} />
		) : (
			exercises.map((exercise, i) => (
				<div key={i} className={styles.exercise}>
					<div className={styles.exerciseName}>
						<p>{exercise.name}</p>
						<div className={styles.exerciseIcons}>
							<button
								onClick={() => openUpdateForm(exercise)}
								className={styles.exerciseIconsButton}
							>
								<IconContext.Provider value={{ className: styles.exerciseIconsIcon }}>
									<IoCreate />
								</IconContext.Provider>
							</button>
							<button
								onClick={() => handleDelete(exercise.id)}
								className={styles.exerciseIconsButton}
							>
								<IconContext.Provider value={{ className: styles.exerciseIconsIcon }}>
									<IoCloseCircle />
								</IconContext.Provider>
							</button>
						</div>
					</div>
					<div className={styles.exerciseInfoContainer}>
						<div className={styles.exerciseInfo}>
							<h2>Reps</h2>
							<p>{exercise.reps}</p>
						</div>
						<div className={styles.exerciseInfo}>
							<h2>Weight</h2>
							<p>{exercise.weight}kg</p>
						</div>
					</div>
					<hr />
				</div>
			))
		);
	};

	const handleClick = () => {
		setIsModalOpen(true);
	};
	const closeModal = () => {
		setIsModalOpen(false);
	};
	const closeUpdateModal = () => {
		setUpdateModalOpen(false);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		await newExercise();
		fetchExercises();
		closeModal();
	};
	const handleUpdateSubmit = async (e) => {
		e.preventDefault();
		await updateExercise();
		setExerciseId('');
		fetchExercises();
		setUpdateModalOpen(false);
	};

	const handleDelete = async (id) => {
		try {
			await axios.delete(
				`${API_ROOT}/users/${currentUser.id}/workouts/${workout_id}/exercises/${id}`,
				{
					headers: { Authorization: `Token ${currentUser.token}` },
				}
			);
			fetchExercises();
		} catch (err) {
			setIsError(true);
		}
	};

	return (
		<>
			<NavMenu />
			<Link to="/workouts">
				<IconContext.Provider value={{ className: styles.goBackLink }}>
					<IoArrowBackCircleOutline />
				</IconContext.Provider>
			</Link>
			<main className={styles.main}>
				<h1>{workout.name}</h1>
				<div className={styles.exercisesContainer}>
					{renderExercises()}
					<button onClick={handleClick} className={styles.addWorkout}>
						<IconContext.Provider value={{ className: styles.icon }}>
							<IoAddCircleOutline />
						</IconContext.Provider>
					</button>
				</div>
			</main>
			{isModalOpen ? (
				<div className={styles.modal}>
					<button className={styles.closeModalButton} onClick={closeModal}>
						{' '}
						<IconContext.Provider value={{ className: styles.closeButton }}>
							<IoCloseCircleOutline />
						</IconContext.Provider>
					</button>
					<form onSubmit={handleSubmit} className={styles.form}>
						<label htmlFor="name">Exercise Name:</label>
						<input type="text" id="name" required onChange={handleInputChange} />
						<label htmlFor="reps">Reps:</label>
						<input type="number" id="reps" required onChange={handleInputChange} />
						<label htmlFor="weight">Weight (kg):</label>
						<input type="number" id="weight" required onChange={handleInputChange} />
						<input type="submit" value="Add Exercise" />
					</form>
				</div>
			) : null}
			{updateModalOpen ? (
				<div className={styles.modal}>
					<button className={styles.closeModalButton} onClick={closeUpdateModal}>
						{' '}
						<IconContext.Provider value={{ className: styles.closeButton }}>
							<IoCloseCircleOutline />
						</IconContext.Provider>
					</button>
					<form onSubmit={handleUpdateSubmit} className={styles.form}>
						<label htmlFor="name">Exercise Name:</label>
						<input
							type="text"
							id="name"
							required
							onChange={handleUpdateChange}
							value={updateData.name}
						/>
						<label htmlFor="reps">Reps:</label>
						<input
							type="number"
							id="reps"
							required
							onChange={handleUpdateChange}
							value={updateData.reps}
						/>
						<label htmlFor="weight">Weight (kg):</label>
						<input
							type="number"
							id="weight"
							required
							onChange={handleUpdateChange}
							value={updateData.weight}
						/>
						<input type="submit" value="Update Exercise" />
					</form>
				</div>
			) : null}
		</>
	);
};
