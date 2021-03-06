import React, { Component } from 'react';
import WorkEntriesListItem from './WorkEntriesListItem';

export default class WorkEntriesList extends Component {
	render() {
		const { entries, ...props } = this.props;
		return (
			<ul className='list'>
				{ entries.map(e => (
					<WorkEntriesListItem key={e._id} entry={e} {...props} />)
				)}
			</ul>
		)
	}
}