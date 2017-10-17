import React, { Component } from 'react';
import {
	Input,
	Row,
	Col 
} from 'reactstrap';
import { connect } from 'react-redux';
import update from 'immutability-helper';

const SECONDS_BEFORE_SUBMIT = 1;

export default class ObjectivesDisplayListFilterBar extends Component {
	constructor() {
		super();
		this.submitTimer = null;
		this.state = {
			title : '',
		}
	}
	setFilter = (event) => {
		this.setState(update(this.state, {[event.target.name] : {$set: event.target.value}}));
		this.resetSubmitTimer(SECONDS_BEFORE_SUBMIT);
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
		const { title } = this.state;
		return (
			<Row className='filters objectives-display-filters'>
				<Col xs={12}>
					<Input name='title' value={title} 
						placeholder='Title' onChange={this.setFilter} />
				</Col>
			</Row>
		);
	}
}