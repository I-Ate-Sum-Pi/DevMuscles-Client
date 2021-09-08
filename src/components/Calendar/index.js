import axios from 'axios';
import Calendar from 'react-calendar';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import 'react-calendar/dist/Calendar.css';

export default () => {
	const [dates, setDates] = useState([]);
	const { currentUser } = useAuth();

	const { push } = useHistory();
	const changeDate = (e) => {
		push(`/calendar/${dayjs(e).format('YYYY-MM-DD')}`);
	};

	useEffect(() => {
		const fetchDatesWithWorkouts = async () => {
			try {
				const API_ROOT = process.env.REACT_APP_API_ROOT
					? process.env.REACT_APP_API_ROOT
					: 'https://devmuscles.herokuapp.com';
				const { data } = await axios.get(`${API_ROOT}/users/${currentUser.id}/dates`, {
					headers: {
						Authorization: `Token ${currentUser.token}`,
					},
				});
				console.log(data);
				setDates(data);
			} catch (err) {
				console.error(err);
				return null;
			}
		};
		fetchDatesWithWorkouts();
	}, []);

	const tileClassName = ({ activeStartDate, date, view }) => {
		return view === 'month' &&
			dates.find((element) => element.date === dayjs(date).format('YYYY-MM-DD'))
			? styles.highlightedDay
			: null;
	};

	return (
		<section aria-label="Calendar">
			<Calendar onChange={changeDate} tileClassName={tileClassName} />
		</section>
	);
};
