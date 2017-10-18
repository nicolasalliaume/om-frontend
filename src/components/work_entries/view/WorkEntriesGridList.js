import React, { Component } from 'react';
import { connect } from 'react-redux';
import WorkEntriesGridListItem from './WorkEntriesGridListItem';

export default class WorkEntriesGridList extends Component {
	render() {
		const { entries } = this.props;
		return (
			<ul className='grid'>
				{ entries.map(e => (
					<WorkEntriesGridListItem key={e._id} entry={e} />)
				)}
			</ul>
		)
	}
}