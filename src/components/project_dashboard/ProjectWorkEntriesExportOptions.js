import React, { Component } from 'react';
import {
	Row,
	Col
} from 'reactstrap';

export default class ProjectWorkEntriesExportOptions extends Component {
	render() {
		return (
			<Row className='project-work-entries-options'>
				<Col xs={12} className='text-center'>
					<a href={this.props.clientLink} target='_blank' rel='nofollow noopener' 
						className='btn btn-secondary'>
						Client report
					</a>
					<a href={this.props.detailedLink} target='_blank' rel='nofollow noopener' 
						className='btn btn-secondary'>
						Detailed report
					</a>
				</Col>
			</Row>
		);
	}
}