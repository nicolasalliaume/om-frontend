import React, { Component } from 'react';
import {
	Input,
	Row,
	Col 
} from 'reactstrap';
import update from 'immutability-helper';
import UsersCombo from '../../users/utils/UsersCombo';
import ProjectsCombo from '../../projects/utils/ProjectsCombo';

const SECONDS_BEFORE_SUBMIT = 1;

export default class WorkEntriesListFilters extends Component {
	constructor(props) {
		super(props);
		this.submitTimer = null;
		const filters = props.filters || {};
		this.state = {
			dateFrom : filters.dateFrom || '',
			dateTo : filters.dateTo || '',
			user : filters.user || '',
			project: filters.project || '',
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
		console.log(this);
		this.props.onChange(this.state);
		clearInterval(this.submitTimer);
	}

	render() {
		const filters = this.getFiltersToShow();
		const { user, dateFrom, dateTo, project } = this.state;
		return (
			<Row className='filters list-filters work-entries-filters'>
				{ filters.includes('dateFrom') && (
					<Col xs={6}>
						<Input type='date' name='dateFrom' value={dateFrom} onChange={this.setFilter} />
					</Col>
				)}
				{ filters.includes('dateTo') && (
					<Col xs={6}>
						<Input type='date' name='dateTo' value={dateTo} onChange={this.setFilter} />
					</Col>
				)}
				{ filters.includes('user') && (
					<Col xs={12}>
						<UsersCombo value={user} name='user' onChange={this.setFilter} 
							placeholder='All users' />
					</Col>
				)}
				{ filters.includes('project') && (
					<Col xs={12}>
						<ProjectsCombo value={project} name='project' onChange={this.setFilter} 
							placeholder='All projects' />
					</Col>
				)}
			</Row>
		);
	}

	getFiltersToShow() {
		const _fields = 'user dateFrom dateTo project'.split(' ');
		const filters = [];
		for (var i = 0; i < _fields.length; i++) {
			if (this.props[_fields[i]] !== undefined) filters.push(_fields[i]);
		}
		return filters;
	}
}