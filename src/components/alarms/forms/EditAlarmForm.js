import React, { Component } from 'react';
import update from 'immutability-helper';
import AlarmDescription from '../misc/AlarmDescription';
import { 
	Col,
	Form,
	FormGroup,
	Label,
	Input
} from 'reactstrap';
import {
	UserFilter,
	ProjectFilter,
	DateFilter,
	ObjectiveStateFilter,
	TaskStateFilter,
} from './EditAlarmFormFilters';
import { and } from '../../../utils';

export default class EditAlarmForm extends Component {
	constructor() {
		super();
		this.state = { validation: { name: true, measure: true } };
	}

	propChanged = ( event ) => {
		const alarm = update( this.props.alarm, 
			{ [event.target.name] : { $set: event.target.value } } );
		this.props.onChange( alarm );
	}

	measureChanged = ( event ) => {
		const alarm = update( this.props.alarm, { 
			measure : { $set: event.target.value },
			user_filter : { $set: '' },
			project_filter : { $set: '' },
			date_filter : { $set: '' },
			state_filter : { $set: '' },
		} );
		this.props.onChange( alarm );
	}

	render() {
		const { validation } = this.state;
		const { alarm } = this.props;
		const measures = [
			[ 'hours_executed', 'hours executed' ],
			[ 'hours_billed', 'hours billed' ],
			[ 'objectives_quantity', 'number of objectives' ],
			[ 'tasks_quantity', 'number of tasks' ],
		];
		return (
			<Form className='edit-alarm-form' onSubmit={e => e.preventDefault() && false}>
				<FormGroup row>
					<Label for="name" sm={2}>Name</Label>
					<Col sm={10}>
						<Input type="text" name="name" id="name" 
							invalid={!validation.name}
							onChange={this.propChanged}
							value={alarm.name} />
					</Col>
				</FormGroup>

				<AlarmDescription alarm={alarm} />
				
				<hr/>
				<FormGroup row>
					<Label for="measure" sm={2}>When the</Label>
					<Col sm={10}>
						<Input type="select" name="measure" id="measure" 
							invalid={!validation.measure}
							onChange={this.measureChanged}
							value={alarm.measure}>
							<option value=''>Select one...</option>
							{ measures.map( m => <option key={m[0]} value={m[0]}>{m[1]}</option> ) }
						</Input>
					</Col>
				</FormGroup>

				{ alarm.measure && <hr/> }
				{ alarm.measure && this.renderFilters() }
				
				<hr/>

				{ this.renderCondition() }

			</Form>
		);
	}

	renderCondition() {
		return (
			<FormGroup row>
				<Label for="condition_op" sm={2}>Is</Label>
				<Col sm={5}>
					<Input type="select" name="condition_op" id="condition_op" 
						onChange={this.propChanged}
						value={this.props.alarm.condition_op}>
						<option value='>'>greater than</option>
						<option value='>='>greater than or equal to</option>
						<option value='=='>equal to</option>
						<option value='<='>less than or equal to</option>
						<option value='<'>less than</option>
					</Input>
				</Col>
				<Col sm={3}>
					<Input type="text" name="condition_value" id="condition_value" 
						onChange={this.propChanged}
						value={this.props.alarm.condition_value} />
				</Col>
			</FormGroup>
		);
	}

	renderFilters() {
		const { alarm: { measure } } = this.props;
		if ( measure === 'hours_executed' )
			return [ this.renderUserFilter( 'By', true, false ), this.renderProjectFilter(), this.renderDateFilter() ];
		if ( measure === 'hours_billed' )
			return [ this.renderProjectFilter(), this.renderDateFilter() ];
		if ( measure === 'objectives_quantity' )
			return [ this.renderObjectiveStateFilter(), this.renderUserFilter( 'Owned by', false, true ), this.renderProjectFilter( 'Related to' ) ];
		if ( measure === 'tasks_quantity' )
			return [ this.renderProjectFilter(), this.renderTaskStateFilter() ];
	}

	renderUserFilter( label='By', showEverybody=true, showAnyone=false ) {
		const placeholder = showEverybody ? 'everybody' : ( showAnyone ? 'anyone' : 'Select one...' );
		return ( <UserFilter 
			label={label}
			placeholder={placeholder} 
			onChange={this.propChanged}
			value={this.props.alarm.user_filter} /> );
	}

	renderProjectFilter( label='On' ) {
		return ( <ProjectFilter label={label} 
			onChange={this.propChanged}
			value={this.props.alarm.project_filter} /> );
	}

	renderDateFilter() {
		return ( <DateFilter value={this.props.alarm.date_filter}
			onChange={this.propChanged} /> );
	}

	renderObjectiveStateFilter() {
		return ( <ObjectiveStateFilter value={this.props.alarm.state_filter}
			onChange={this.propChanged} /> );
	}

	renderTaskStateFilter() {
		return ( <TaskStateFilter value={this.props.alarm.state_filter}
			onChange={this.propChanged} /> );
	}

	validate = () => {
		const { alarm } = this.props;
		const validation = {
			name : !!alarm.name,
			measure : !!alarm.measure,
		};
		this.setState( { validation } );
		return and( Object.values( validation ) );
	}
}
