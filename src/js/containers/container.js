import React from 'react';
import Header from '../components/header';
import Calendar from '../components/calendar';
import Weekdays from '../components/weekdays';

const Container = () => {
	return (
		<div id="container">
			<Header />
			<Weekdays />
			<Calendar />
			<div className="note">Make sure to view the README.md for more details and next steps</div>
		</div>
	);
}

export default Container;