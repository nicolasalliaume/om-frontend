import React, { Component } from 'react';
import {
	Row,
	Col ,
	Button,
	Link
} from 'reactstrap';
import ExternalUrllLink from '../misc/ExternalUrlLink';
import Icon from '../misc/Icon';

export default class ProjectWorkEntriesExportOptions extends Component {
	render() {
		return (
			<Row>
				<Col xs={12} className='text-right'>
					<ExternalUrllLink url={this.props.htmlLink}>
						<Icon fa-share-square-o />
					</ExternalUrllLink>
				</Col>
			</Row>
		);
	}
}