import React from 'react';
import ObjectivesSummaryCard from './ObjectivesSummaryCard';

export default function CompanyObjectivesSummaryCard(props) {
	return <ObjectivesSummaryCard type='company'{...props}
		title='<b>Everybody</b> today' 
		description="This is how much progress everyone has made so far today"
		progress={0.7}
		color='warning'
		label={`We've completed <b>${7} out of ${10}</b> objectives`} />
}