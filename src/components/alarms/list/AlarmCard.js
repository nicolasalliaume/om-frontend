import React, { Component } from 'react';
import { Col, Card, CardBlock, CardTitle, Button } from 'reactstrap';
import EditAlarmModalForm from '../forms/EditAlarmModalForm';
import update from 'immutability-helper';
import { connect } from 'react-redux';
import { updateAlarm, createAlarm } from '../../../actions/alarms';

class AlarmCard extends Component {
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
						<div className='quick-options'>
							<Button onClick={this.toggleEnabled}>
								<i className={`fa fa-bell${alarm.enabled ? '-slash' : ''}`} />
							</Button>
							<Button onClick={this.duplicate}>
								<i className='fa fa-copy' />
							</Button>
						</div>
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

	toggleEnabled = () => {
		const { alarm } = this.props;
		this.props.updateAlarm(alarm._id, update(alarm, {
			enabled: {$set: !alarm.enabled}
		}))
	}

	duplicate = () => {
		const newAlarm = update(this.props.alarm, { $unset: ['_id'] });
		this.props.createAlarm(newAlarm);
	}
}

const mapDispatchToProps = dispatch => ({
	updateAlarm : (alarmId, update) => dispatch(updateAlarm(alarmId, update)),
	createAlarm : (alarmId, update) => dispatch(createAlarm(alarmId, update)),
})

export default connect(null, mapDispatchToProps)(AlarmCard);