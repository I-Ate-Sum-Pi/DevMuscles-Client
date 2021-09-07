import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';

export default () => {
	const [dateState, setDateState] = useState(new Date());
	return (
		<main>
			<h1>Hello Calendar!</h1>;
			<Calendar />
		</main>
	);
};
