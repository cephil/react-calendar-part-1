import React from 'react';
import Moment from 'moment';

//todo: pass down as props
const weekdays = Moment.weekdays();

const renderWeekdays = weekdays.map(function(value, index) {
	return <li key={ index }>{ value }</li> 
});
									  

const Weekdays = () => {
	return (
		<ul id="headings">
			{renderWeekdays}
		</ul>
	);
}

export default Weekdays;