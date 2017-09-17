import React, { Component } from 'react';
import moment from 'moment';
import update from 'immutability-helper';
import { 
	Row, 
	Col, 
	Button, 
	Form, 
	FormGroup, 
	Label, 
	Input, 
	FormText 
} from 'reactstrap';
import UsersMultiSelect from './../../users/utils/UsersMultiSelect';

import { createObjective, invalidateObjectivesList } from './../../../actions/objectives';

export default class EditObjectiveForm extends Component {
	constructor() {
		super();
		this.state = { objective : null }
	}
	componentWillMount() {
		this.setState({objective : this.props.objective});
	}
	objectivePropChanged = (event) => {
		const newState = update(this.state,
			{objective: {[event.target.name]: {$set: event.target.value}}});
		this.setState(newState);
		this.props.onChange(newState);
	}
	completedChanged = (event) => {
		if (event.target.checked) {
			this.setState(update(this.state, {objective: {progress: {$set: 1}}}))
		} else {
			this.setState(update(this.state, {objective: {progress: {$set: 0}}}))
		}
	}
	render() {
		const { objective } = this.state;
		return (
			<Form className='edit-objective-form' onSubmit={e => e.preventDefault() && false}>
				<FormGroup row>
					<Label for="title" sm={2}>Title</Label>
					<Col sm={10} className='align-self-center'>
						{ objective.related_task &&
							<Input static className='static-objective-title'>{objective.title}</Input>
						}
						{ !objective.related_task &&
							<Input type="text" name="no_task_title" id="title" 
								onChange={this.objectivePropChanged}
								placeholder="Solve this thing" value={objective.no_task_title} />
						}
					</Col>
				</FormGroup>
				<FormGroup row>
					<Label for="objective_date" sm={2}>Date</Label>
					<Col sm={3}>
						<Input type="select" name="level" id="level" value={objective.level}
								onChange={this.objectivePropChanged}>
							<option value='day'>Day</option>
							<option value='month'>Month</option>
							<option value='year'>Year</option>
						</Input>
					</Col>
					<Col sm={7}>
						<Input type="date" name="objective_date" id="objective_date" placeholder=""
							value={objective.objective_date} onChange={this.objectivePropChanged}/>
					</Col>
				</FormGroup>
				<FormGroup row>
					<Label sm={2}>Owners</Label>
					<Col sm={10}>
						<UsersMultiSelect name='owners' value={objective.owners} 
							onChange={this.objectivePropChanged} />
					</Col>
				</FormGroup>
				<FormGroup row>
					<Col sm={6}>
						<FormGroup check>
							<Label check>
								<Input type="checkbox" name="completed" id="completed" 
									onChange={this.completedChanged} checked={objective.progress == 1}/>{' '}
								Already completed?
							</Label>
						</FormGroup>
					</Col>
				</FormGroup>
			</Form>
		)
	}
}