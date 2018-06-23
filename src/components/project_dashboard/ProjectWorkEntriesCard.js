import React, { Component } from 'react';
import { Card, CardBody, CardTitle } from 'reactstrap';
import WorkEntriesList from '../work_entries/view/WorkEntriesList';
import WorkEntriesListFilters from '../work_entries/view/WorkEntriesListFilters';
import WorkEntriesListExportingButtons from '../work_entries/view/WorkEntriesListExportingButtons';
import { Endpoints, EndpointAuthQuerystring } from '../../actions/endpoints';

export default class ProjectWorkEntriesCard extends Component {
	render() {
		const { project, workEntries } = this.props;
		if (!project || !workEntries) return <div/>;

		return (
			<Card className='work-entries project-work-entries text-center'>
				<CardBody >
					<CardTitle>Work <b>entries</b></CardTitle>
					<WorkEntriesListFilters dateFrom dateTo user
					  filters={workEntries.filters}
					  onChange={this.props.onFiltersChange} />
					<WorkEntriesListExportingButtons 
						options={[
							{ label: 'Export for client', url: this.getExportHtmlClientLink() },
							{ label: 'Export detailed', url: this.getExportHtmlDetailedLink() },
						]} />
					<WorkEntriesList entries={workEntries.entries} />
				</CardBody>
			</Card>
		)
	}

	getExportHtmlDetailedLink() {
		const { project, workEntries } = this.props;
		return Endpoints.RENDER_WORK_ENTRIES_FOR_PROJECT(project._id, workEntries.filters) 
					+ EndpointAuthQuerystring();
	}

	getExportHtmlClientLink() {
		const { project, workEntries } = this.props;
		return Endpoints.RENDER_PROJECT_STATUS_FOR_CLIENT(project._id, workEntries.filters) 
					+ EndpointAuthQuerystring();
	}
}