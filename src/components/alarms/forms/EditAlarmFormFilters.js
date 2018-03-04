import React from 'react';
import { FormGroup, Input, Label, Col } from 'reactstrap';
import ProjectsCombo from '../../projects/utils/ProjectsCombo';
import UsersCombo from '../../users/utils/UsersCombo';
import moment from 'moment';

export function UserFilter(props) {
	const { label, placeholder, onChange, value } = props;
	return (
		<FormGroup row key='user-filter'>
			<Label for="user_filter" sm={2}>{label}</Label>
			<Col sm={10}>
				<UsersCombo value={value} name='user_filter' 
					onChange={onChange} placeholder={placeholder}
					id='user_filter' />
			</Col>
		</FormGroup>
	)
}

export function ProjectFilter(props) {
	const { label, value, onChange } = props;
	return (
		<FormGroup row key='project-filter'>
			<Label for="project_filter" sm={2}>{label}</Label>
			<Col sm={10}>
				<ProjectsCombo value={value} name='project_filter' 
					onChange={onChange} placeholder='all projects'
					id='project_filter' />
			</Col>
		</FormGroup>
	)
}

export function DateFilter(props) {
	const { value, onChange } = props;
	return (
		<FormGroup row key='date-filter'>
			<Label for="date_filter" sm={2}>In</Label>
			<Col sm={10}>
				<Input type="select" name="date_filter" id="date_filter" 
						onChange={onChange} value={value}>
					<option value=''>the entire time</option>
					<option value='this_week'>this week</option>
					<option value='this_month'>this month</option>
					<option value='last_2_months'>the last two months</option>
					<option value='this_year'>this year</option>
				</Input>
			</Col>
		</FormGroup>
	)
}

export function ObjectiveStateFilter(props) {
	const { value, onChange } = props;
	return (
		<FormGroup row key='objective-state-filter'>
			<Label for="state_filter" sm={2}>In</Label>
			<Col sm={10}>
				<Input type="select" name="state_filter" id="state_filter" 
						onChange={onChange} value={value}>
					<option value=''>any state</option>
					<option value='completed'>completed state</option>
					<option value='active'>active state</option>
				</Input>
			</Col>
		</FormGroup>
	)
}

export function TaskStateFilter(props) {
	const { value, onChange } = props;
	return (
		<FormGroup row key='task-state-filter'>
			<Label for="state_filter" sm={2}>In</Label>
			<Col sm={10}>
				<Input type="select" name="state_filter" id="state_filter" 
						onChange={onChange} value={value}>
					<option value=''>any state</option>
					<option value='unassigned'>unassigned (no objective)</option>
					<option value='active'>assigned and active</option>
					<option value='completed'>assigned and completed</option>
				</Input>
			</Col>
		</FormGroup>
	)
}