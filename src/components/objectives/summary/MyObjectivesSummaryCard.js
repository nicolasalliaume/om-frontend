import React from 'react';
import ObjectivesSummaryCard from './ObjectivesSummaryCard';

export default function MyObjectivesSummaryCard(props) {
	return <ObjectivesSummaryCard type='me'{...props}
		title='<b>Me</b> today'
		description="This is how much progress I've made so far today"
		progress={props.completed/props.count}
		color='info'
		label={`You've completed <b>${props.completed} out of ${props.count}</b> objectives`} />
}