import React, { Component } from 'react';
import { connect } from 'react-redux';
import WorkEntriesListItem from './WorkEntriesListItem';

export default class WorkEntriesList extends Component {
	render() {
		const { entries } = this.props;
		console.log(entries);
		return (
			<ul>
				{ entries.map(e => (
					<WorkEntriesListItem key={e._id} entry={e} />)
				)}
			</ul>
		)
	}
}