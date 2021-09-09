import axios from 'axios';
import FadeLoader from 'react-spinners/FadeLoader';
import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';
import { useAuth } from '../../contexts/AuthContext';
import { NavMenu } from '../../components';
import { IconContext } from 'react-icons';
import { IoAddCircle, IoCreate, IoCloseCircle, IoArrowBackCircleOutline } from 'react-icons/io5';
import { Link, useParams } from 'react-router-dom';

export default () => {
	const { workout_id } = useParams();
	const [exercises, setExercises] = useState([]);
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

	const openUpdateForm = (exerciseId) => {
		setExerciseId(exerciseId);
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
					<div className={styles.exercise_name}>
						{exercise['name']}
						<div className={styles.workout_icons}>
							<div onClick={() => openUpdateForm(exercise.id)}>
								<IconContext.Provider value={{ className: styles.icon_exercise }}>
									<IoCreate />
								</IconContext.Provider>
							</div>
							<div onClick={() => handleDelete(exercise.id)}>
								<IconContext.Provider value={{ className: styles.icon_exercise }}>
									<IoCloseCircle />
								</IconContext.Provider>
							</div>
						</div>
					</div>
					<div className={styles.exercise_content}>
						<div className={styles.exercise_reps}>
							<div>Reps</div>
							<div>{exercise['reps']}</div>
						</div>
						<div className={styles.exercise_weight}>
							<div>Weight</div>
							<div>{exercise['weight']}kg</div>
						</div>
					</div>
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
				<h1>Workout Name</h1>
				<div className={styles.exercise_section}>{renderExercises()}</div>
				{/* <button onClick={handleClick}>Add Exercise</button> */}
				<button onClick={handleClick}>
					<IconContext.Provider value={{ className: styles.icon }}>
						<IoAddCircle />
					</IconContext.Provider>
				</button>
			</main>
			{isModalOpen ? (
				<div className={styles.exercise_modal}>
					<button className={styles.closeModalButton} onClick={closeModal}>
						X
					</button>
					<form onSubmit={handleSubmit}>
						<label htmlFor="name">Exercise Name:</label>
						<input type="text" id="name" required onChange={handleInputChange} />
						<label htmlFor="reps">Reps:</label>
						<input type="number" id="reps" required onChange={handleInputChange} />
						<label htmlFor="weight">Weight:</label>
						<input type="number" id="weight" required onChange={handleInputChange} />
						<button onClick={handleSubmit}>Add workout</button>
					</form>
				</div>
			) : null}
			{updateModalOpen ? (
				<>
					<form onSubmit={handleUpdateSubmit}>
						<label htmlFor="name">Exercise Name:</label>
						<input type="text" id="name" required onChange={handleUpdateChange} />
						<label htmlFor="reps">Reps:</label>
						<input type="number" id="reps" required onChange={handleUpdateChange} />
						<label htmlFor="weight">Weight:</label>
						<input type="number" id="weight" required onChange={handleUpdateChange} />
						<button onClick={handleUpdateSubmit}>Update Exercise</button>
					</form>
				</>
			) : null}
		</>
	);
};
