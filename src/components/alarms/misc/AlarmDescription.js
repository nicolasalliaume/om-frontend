import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

const mapStateToProps = state => ({
	usersById: state.cache.users.usersById,
	projectsById: state.cache.projects.projectsById,
})

function dateFromRelativeDate(relative) {
	switch (relative) {
		case 'this_week': return moment().startOf('week');
		case 'this_month': return moment().startOf('month');
		case 'last_2_months': return moment().startOf('month').add(-1, 'months');
		case 'this_year': return moment().startOf('year');
		default: return moment().startOf('year').add(-99, 'year');
	}
}

export default connect(mapStateToProps)(function(props) {
	const { alarm, projectsById, usersById } = props;
	if (!alarm.measure) return <span/>;

	const measure = alarm.measure.replace(/_/g, ' ');

	let filters = '';
	if (alarm.state_filter) {
		filters += ` in state "${alarm.state_filter}"`;
	}
	if (alarm.user_filter) {
		const label = 'objectives_quantity tasks_quantity'.indexOf(alarm.measure) >= 0 ? 'owned by' : 'by';
		filters += ` ${label} ${usersById[alarm.user_filter].full_name}`;
	}
	if (alarm.project_filter) {
		filters += ` on project ${projectsById[alarm.project_filter].name}`;
	}
	if (alarm.date_filter) {
		filters += ` since ${dateFromRelativeDate(alarm.date_filter).format('ll')}`;
	}
	
	const description = `Fires when the ${measure}${filters} is ${alarm.condition_op} ${alarm.condition_value}`;
	return <p className='alarm-description'>{description}</p>
})