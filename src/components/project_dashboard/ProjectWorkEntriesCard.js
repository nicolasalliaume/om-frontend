import React, { Component } from 'react';
import { Card, CardBody, CardTitle } from 'reactstrap';
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
				<CardBody >
					<CardTitle>Work <b>entries</b></CardTitle>
					<ProjectWorkEntriesCardFilters submit={this.props.applyWorkEntryFilters} />
					<ProjectWorkEntriesExportOptions 
						detailedLink={this.getExportHtmlDetailedLink()}
						clientLink={this.getExportHtmlClientLink()} />
					<WorkEntriesList entries={workEntries.entries} />
				</CardBody>
			</Card>
		)
	}

	getExportHtmlDetailedLink() {
		const { project, workEntries } = this.props;
		return Endpoints.RENDER_WORK_ENTRIES_FOR_PROJECT(project, workEntries.filters) 
					+ EndpointAuthQuerystring();
	}

	getExportHtmlClientLink() {
		const { project, workEntries } = this.props;
		return Endpoints.RENDER_PROJECT_STATUS_FOR_CLIENT(project, workEntries.filters) 
					+ EndpointAuthQuerystring();
	}
}