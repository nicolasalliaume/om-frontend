import React, { Component } from 'react';
import {
	Row,
	Col,
	Input
} from 'reactstrap';
import moment from 'moment';
import { connect } from 'react-redux';

class WorkEntriesGridListNewItem extends Component {
	constructor() {
		super();
		this.state = { time: '00:00', validation: { time: true } }
	}
	
	updateTime = (event) => {
		this.setState({ time: event.target.value })
	}
	
	checkIntro = (event) => {
		if (event.key === 'Enter') {
			this.submit();
		}
	}
	
	submit = () => {
		const time = this.getParsedTime();
		if (!this.validate(time)) return;
		this.props.submit(time);
	}
	
	render() {
		return (
			<div className='grid new entry'>
				<Row>
					<Col xs={2}>
						<span className='date'>{moment.utc().format('MM/DD')}</span>
					</Col>
					<Col xs={3}>
						<span className='ago'>Just now</span>
					</Col>
					<Col xs={4}>
						<span className='user'>{this.props.currentUser.user.full_name}</span>
					</Col>
					<Col xs={3}>
						<span className='time'>
							<Input name='time' value={this.state.time} invalid={!this.state.validation.time}
								onChange={this.updateTime} onKeyPress={this.checkIntro} />
						</span>
					</Col>
				</Row>
			</div>
		)
	}

	validate = (time) => {
		const valid = !!time && time > 0;
		this.setState({ validation: { time: valid } });
		return valid;
	}

	getParsedTime = () => {
		let [hours, minutes] = this.state.time.split(':');
		if (!hours) return null;
		hours = parseInt(hours, 10);
		if (minutes) hours += parseInt(minutes, 10) / 60;
		return hours;
	}
}

const mapStateToProps = (state, props) => { return {
	currentUser: state.currentUser,
	...props
}}

export default connect(mapStateToProps)(WorkEntriesGridListNewItem)