import React from 'react';
import ObjectivesSummaryCard from './ObjectivesSummaryCard';

export default function MyObjectivesSummaryCard(props) {
	return <ObjectivesSummaryCard type='me'{...props}
		title='<b>Me</b> today'
		description="This is how much progress I've made so far today"
		progress={0.3}
		color='info'
		label={`You've completed <b>${2} out of ${5}</b> objectives`} />
}