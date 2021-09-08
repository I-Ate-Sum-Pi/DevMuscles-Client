import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import dayjs from 'dayjs';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';

export default () => {
	const { push } = useHistory();

	const changeDate = (e) => {
		push(`/calendar/${dayjs(e).format('YYYY-MM-DD')}`);
	};

	const [dates, setDates] = useState([]);
	const { currentUser } = useAuth();
	const API_ROOT = process.env.REACT_APP_API_ROOT
		? process.env.REACT_APP_API_ROOT
		: 'https://devmuscles.herokuapp.com';

	useEffect(() => {
		const fetchDatesWithWorkouts = async () => {
			try {
				const { data: dates } = await axios.get(
					`${API_ROOT}/users/${currentUser.id}/dates?date=${date}`
				);
				console.log(dates);
				if (dates) {
					//Make calendar coloured not sure how to do this
				}
			} catch (err) {
				console.error(err);
				return null;
			}
		};
		fetchDatesWithWorkouts();
	}, []);
	return (
		<section aria-label="Calendar">
			<Calendar onChange={changeDate} />
		</section>
	);
};
