import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';

export default () => {
	const [dateState, setDateState] = useState(new Date());
	const changeDate = (e) => {
		setDateState(e);
	};
	return (
		<main>
			<h1>Hello Calendar!</h1>
			<Calendar value={dateState} onChange={changeDate} />
			<p>
				The date you have currently selected is <b> {moment(dateState).format('Do MMMM YYYY')}</b>
			</p>
		</main>
	);
};
