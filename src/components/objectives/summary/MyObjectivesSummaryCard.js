import React from 'react';
import ObjectivesSummaryCard from './ObjectivesSummaryCard';
import ObjectivesCelebrationCard from './ObjectivesCelebrationCard';
import { getRandomIntInclusive } from '../../../utils';

export default function MyObjectivesSummaryCard(props) {
	if (props.completed === props.count && props.count > 0) {
		// Let's celebrate that!
		return <ObjectivesCelebrationCard celebrationStyle={getRandomIntInclusive(0,4)} />
	}
	return (
		<ObjectivesSummaryCard 
			type='me'
			title='<b>Me</b> today'
			description="This is how much progress I've made so far today"
			progress={props.completed/props.count}
			color='info'
			label={`You've completed <b>${props.completed} out of ${props.count}</b> objectives`}
			{...props} />
	);
}