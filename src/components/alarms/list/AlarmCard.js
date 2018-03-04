import React, { Component } from 'react';
import { Col, Card, CardBlock, CardTitle, Button } from 'reactstrap';
import EditAlarmModalForm from '../forms/EditAlarmModalForm';

export default class AlarmCard extends Component {
	constructor() {
		super();
		this.state = { modal : false };
	}
	toggleModal = () => this.toggleState('modal');
	toggleState = (name) => this.setState({ [name] : !this.state[name] })
	render() {
		const { alarm } = this.props;
		const stateClass = alarm.enabled ? 'enabled' : 'disabled';
		return (
			<Col lg={3} md={4} sm={6} xs={6}>
				<Card className={`alarm-card ${stateClass}`}>
					<CardBlock className='card-body'>
						<CardTitle>{alarm.name}</CardTitle>
						<div className='author'>{alarm.created_by.full_name}</div>
						<div className='text-center'>
							<Button className='view-details' onClick={this.toggleModal}>
								View details
							</Button>
						</div>
						<div className='id text-center'>ID: {alarm._id}</div>
					</CardBlock>
				</Card>
				
				<EditAlarmModalForm edit show={this.state.modal} 
					toggle={this.toggleModal} alarm={alarm} />
			</Col>
		)
	}
}