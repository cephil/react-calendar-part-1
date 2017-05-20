import React from 'react';
import Moment from 'moment';
import _ from 'lodash';

//todo: pass down as props
// const weekdays = Moment.weekdays();

const daysInMonth = Moment().daysInMonth();
const today = Moment().format('DD');
const totalDays = _.range(daysInMonth)

const renderDays = totalDays.map(function(value, index) {
	return ( 
		<div key={ index } className={ index + 1 == today ? "today" : "" }>{ value + 1 }</div> 
	);
});
									  

const Calendar = () => {
	return (
		<section>
			{renderDays}
		</section>
	);
}

export default Calendar;