import React, { Component } from 'react';
import {
	Input,
	Row,
	Col 
} from 'reactstrap';
import { connect } from 'react-redux';
import update from 'immutability-helper';
import UsersCombo from '../users/utils/UsersCombo';

const SECONDS_BEFORE_SUBMIT = 1;

export default class ProjectWorkEntriesCardFilters extends Component {
	constructor() {
		super();
		this.submitTimer = null;
		this.state = {
			dateFrom : '',
			dateTo : '',
			user : ''
		}
	}
	setFilter = (event) => {
		this.setState(update(this.state, {[event.target.name] : {$set: event.target.value}}));
		const submitDelay = event.target.name === 'title' ? SECONDS_BEFORE_SUBMIT : 0;
		this.resetSubmitTimer(submitDelay);
	}
	resetSubmitTimer = (seconds) => {
		if (this.submitTimer) clearInterval(this.submitTimer);
		this.submitTimer = setTimeout(this.submitFilters, seconds*1000);
	}
	submitFilters = () => {
		this.props.submit(this.state);
		clearInterval(this.submitTimer);
	}
	render() {
		const { title, user, dateFrom, dateTo } = this.state;
		return (
			<Row className='filters objectives-display-filters'>
				<Col xs={6}>
					<Input type='date' name='dateFrom' value={dateFrom} onChange={this.setFilter} />
				</Col>
				<Col xs={6}>
					<Input type='date' name='dateTo' value={dateTo} onChange={this.setFilter} />
				</Col>
				<Col xs={12}>
					<UsersCombo value={user} name='user' onChange={this.setFilter} 
						placeholder='All users' />
				</Col>
			</Row>
		);
	}
}