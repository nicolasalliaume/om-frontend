import React, { Component } from 'react';
import { Card, CardBody, CardTitle } from 'reactstrap';
import WorkEntriesList from '../../work_entries/view/WorkEntriesList';
import WorkEntriesListFilters from '../../work_entries/view/WorkEntriesListFilters';
import WorkEntriesListExportingButtons from '../../work_entries/view/WorkEntriesListExportingButtons';
import { Endpoints, EndpointAuthQuerystring } from '../../../actions/endpoints';

export default class UserWorkEntriesCard extends Component {
	render() {
		const { workEntries, onFiltersChange } = this.props;
		return (
			<Card className='work-entries user-work-entries text-center'>
				<CardBody >
					<CardTitle>My work <b>entries</b></CardTitle>
					<WorkEntriesListExportingButtons 
						options={[
							{ label: 'Export my hours', url: this.getExportHtmlLink() },
						]} />
					<WorkEntriesListFilters dateFrom dateTo project 
					  onChange={onFiltersChange} />
					<WorkEntriesList entries={workEntries.entries} />
				</CardBody>
			</Card>
		)
	}

	getExportHtmlLink() {
		const { user: { _id }, workEntries } = this.props;
		return Endpoints.RENDER_WORK_ENTRIES_FOR_USER(_id, workEntries.filters) 
					+ EndpointAuthQuerystring();
	}
}