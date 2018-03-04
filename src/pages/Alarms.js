import React, { Component } from 'react';
import { Row, Col, Card, CardBlock, CardTitle } from 'reactstrap';
import AlarmsList from '../components/alarms/list/AlarmsList';
import CreateAlarmFloatingButton from './../components/alarms/misc/CreateAlarmFloatingButton';

import './../styles/Alarms.css';

export default class Alarms extends Component {
	render() {
		return (
			<div className='alarms'>
				<Row className='title-card'>
					<Col xs={12}>
						<Card className='list list--large'>
							<CardBlock className='card-body'>
								<CardTitle><b>alarms</b></CardTitle>
							</CardBlock>
						</Card>
					</Col>
				</Row>
				<AlarmsList />
				<CreateAlarmFloatingButton />
			</div>
		)
	}
}