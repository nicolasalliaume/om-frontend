import React, { Component } from 'react';
import { Row, Col, Card, CardBlock, CardTitle } from 'reactstrap';
import WorkEntriesList from '../work_entries/view/WorkEntriesList';
import ProjectWorkEntriesCardFilters from './ProjectWorkEntriesCardFilters';
import ProjectWorkEntriesExportOptions from './ProjectWorkEntriesExportOptions';
import { Endpoints, EndpointAuthQuerystring } from '../../actions/endpoints';

export default class ProjectWorkEntriesCard extends Component {
	render() {
		const { project, workEntries } = this.props;
		if (!project || !workEntries) return <div/>;

		return (
			<Card className='project-work-entries text-center'>
				<CardBlock className='card-body'>
					<CardTitle>Work <b>entries</b></CardTitle>
					<ProjectWorkEntriesCardFilters submit={this.props.applyWorkEntryFilters} />
					<WorkEntriesList entries={workEntries.entries} />
					<hr />
					<ProjectWorkEntriesExportOptions htmlLink={this.getExportHtmlLink()} />
				</CardBlock>
			</Card>
		)
	}

	getExportHtmlLink() {
		const { project, workEntries } = this.props;
		return Endpoints.RENDER_WORK_ENTRIES_FOR_PROJECT(project, workEntries.filters) 
					+ EndpointAuthQuerystring();
	}
}