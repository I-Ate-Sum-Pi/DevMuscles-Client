import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import dayjs from 'dayjs';
import { useHistory } from 'react-router-dom';

export default () => {
	const { push } = useHistory();

	const changeDate = (e) => {
		push(`/calendar/${dayjs(e).format('DD-MM-YYYY')}`);
	};
	return (
		<main>
			<h1>Hello Calendar!</h1>
			<Calendar value={dateState} onChange={changeDate} />
		</main>
	);
};
