import React, { Component } from 'react';
import { Row, Col, Card, CardBlock, CardTitle } from 'reactstrap';
import WorkEntriesList from '../work_entries/view/WorkEntriesList';

export default class ProjectWorkEntriesCard extends Component {
	render() {
		const { project, workEntries } = this.props;
		if (!project || !workEntries) return <div/>;

		return (
			<Card className='project-work-entries text-center'>
				<CardBlock className='card-body'>
					<CardTitle>Work <b>entries</b></CardTitle>
					<WorkEntriesList entries={workEntries.entries} />
				</CardBlock>
			</Card>
		)
	}
}