import React from 'react';
import ObjectivesSummaryCard from './ObjectivesSummaryCard';

export default function CompanyObjectivesSummaryCard(props) {
	return <ObjectivesSummaryCard type='company'{...props}
		title='<b>Everybody</b> today' 
		description="This is how much progress everyone has made so far today"
		progress={props.completed/props.count}
		color='warning'
		label={`We've completed <b>${props.completed} out of ${props.count}</b> objectives`} />
}