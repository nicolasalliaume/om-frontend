import React, { Component } from 'react';
import { Row, Col, Card, CardBlock } from 'reactstrap';

import MyObjectivesSummaryCard from './MyObjectivesSummaryCard';
import CompanyObjectivesSummaryCard from './CompanyObjectivesSummaryCard';

export default class ObjectivesSummaryPanel extends Component {
	render() {
		return (
			<Row className='objectives-summary'>
				<Col xs={12} sm={6}>
					<CompanyObjectivesSummaryCard />
				</Col>
				<Col xs={12} sm={6}>
					<MyObjectivesSummaryCard />
				</Col>
			</Row>
		)
	}
}