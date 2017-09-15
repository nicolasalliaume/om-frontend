import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import LatestActivityList from './LatestActivityList';

export default class LatestActivityPanel extends Component {
	render() {
		const className = this.props.className;
		return (
			<Row className={className}>
				<Col xs={12}>
					<LatestActivityList />
				</Col>
			</Row>
		)
	}
}