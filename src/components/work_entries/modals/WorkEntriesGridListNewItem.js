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
		this.state = { time: '00:00' }
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
		let [hours, minutes] = this.state.time.split(':');
		if (!hours) return console.error('Missing time');

		hours = parseInt(hours, 10);
		if (minutes) hours += parseInt(minutes, 10) / 60;

		this.props.submit(hours);
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
							<Input name='time' value={this.state.time} 
								onChange={this.updateTime} onKeyPress={this.checkIntro} />
						</span>
					</Col>
				</Row>
			</div>
		)
	}
}

const mapStateToProps = (state, props) => { return {
	currentUser: state.currentUser,
	...props
}}

export default connect(mapStateToProps)(WorkEntriesGridListNewItem)