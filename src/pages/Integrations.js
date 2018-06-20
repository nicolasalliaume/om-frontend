import React, { Component } from 'react';
import { Row, Col, Card, CardBody, CardTitle } from 'reactstrap';
import IntegrationsList from '../components/integrations/list/IntegrationsList';
import CreateIntegrationFloatingButton from './../components/integrations/misc/CreateIntegrationFloatingButton';

import './../styles/Integrations.css';

export default class Integrations extends Component {
	render() {
		return (
			<div className='integrations'>
				<Row className='title-card'>
					<Col xs={12}>
						<Card className='list list--large'>
							<CardBody >
								<CardTitle><b>Integrations</b></CardTitle>
							</CardBody>
						</Card>
					</Col>
				</Row>
				<IntegrationsList />
				<CreateIntegrationFloatingButton />
			</div>
		)
	}
}