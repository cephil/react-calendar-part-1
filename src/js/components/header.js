import React from 'react';
import Moment from 'moment';

//todo: pass down as props
const now = Moment.now();
const weekdayString = Moment(now).format('dddd');
const monthYear = Moment(now).format('MMMM, YYYY');

const Header = () => {
 
	return (
		<header>
			<h1>{ weekdayString }</h1>
			<h2>{ monthYear }</h2>
		</header>
	);
}

export default Header;