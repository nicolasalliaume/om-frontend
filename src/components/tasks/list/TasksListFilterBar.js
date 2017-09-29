import React, { Component } from 'react';
import {
	Button,
	Input,
	Row,
	Col 
} from 'reactstrap';
import ProjectsCombo from './../../projects/utils/ProjectsCombo';
import { connect } from 'react-redux';
import update from 'immutability-helper';
import { applyTasksListFilters } from '../../../actions/tasks';

const SECONDS_BEFORE_SUBMIT = 1;

class TasksListFilterBar extends Component {
	constructor() {
		super();
		this.submitTimer = null;
		this.state = {
			filters : {
				title : '',
				project : '',
				tags : ''
			}
		}
	}
	setFilter = (event) => {
		this.setState(update(this.state, {
			filters: {[event.target.name] : {$set: event.target.value}}}));
		
		const submitInSeconds = event.target.name === 'project' ? 0 : SECONDS_BEFORE_SUBMIT;
		this.resetSubmitTimer(submitInSeconds);
	}
	resetSubmitTimer = (seconds) => {
		if (this.submitTimer) clearInterval(this.submitTimer);
		this.submitTimer = setTimeout(this.submitFilters, seconds*1000);
	}
	submitFilters = () => {
		this.props.applyTasksListFilters(this.state.filters);
		clearInterval(this.submitTimer);
	}
	render() {
		const { filters } = this.state;
		return (
			<Row className='tasks-list-filters'>
				<Col xs={12} md={5}>
					<Input name='title' value={filters.title} 
						placeholder='Title' onChange={this.setFilter} />
				</Col>
				<Col xs={12} md={4}>
					<ProjectsCombo name='project' value={filters.project} 
						placeholder='All projects' onChange={this.setFilter} />
				</Col>
				<Col xs={12} md={3}>
					<Input name='tags' value={filters.tags} 
						placeholder='Tags' onChange={this.setFilter} />
				</Col>
			</Row>
		);
	}
}

const mapDispatchToProps = (dispatch) => { return {
	applyTasksListFilters : (filters) => dispatch(applyTasksListFilters(filters))
}}

export default connect(null, mapDispatchToProps)(TasksListFilterBar);
