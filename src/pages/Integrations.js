import React, { Component } from 'react';
import { Row, Col, Card, CardBlock, CardTitle } from 'reactstrap';
import IntegrationsList from '../components/integrations/list/IntegrationsList';

import './../styles/Integrations.css';

export default class Integrations extends Component {
	render() {
		return (
			<div className='integrations'>
				<Row className='title-card'>
					<Col xs={12}>
						<Card className='list list--large'>
							<CardBlock className='card-body'>
								<CardTitle><b>Integrations</b></CardTitle>
							</CardBlock>
						</Card>
					</Col>
				</Row>
				<IntegrationsList />
			</div>
		)
	}
}