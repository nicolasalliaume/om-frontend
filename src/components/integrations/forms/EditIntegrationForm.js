import React, { Component } from 'react';
import update from 'immutability-helper';
import ProjectsCombo from '../../projects/utils/ProjectsCombo';
import { 
	Col,
	Form,
	FormGroup,
	Label,
	Input 
} from 'reactstrap';

export default class EditIntegrationForm extends Component {
	propChanged = (event) => {
		let integration = update(this.props.integration, 
			{[event.target.name] : {$set: event.target.value}});
		this.props.onChange(integration);
	}
	render() {
		const { integration } = this.props;
		return (
			<Form className='edit-integration-form' onSubmit={e => e.preventDefault() && false}>
				<FormGroup row>
					<Label for="name" sm={2}>Name</Label>
					<Col sm={10}>
						<Input type="text" name="name" id="name" 
							onChange={this.propChanged}
							value={integration.name} />
					</Col>
				</FormGroup>
				<FormGroup row>
					<Label for="service" sm={2}>Service</Label>
					<Col sm={10}>
						<Input type="select" name="service" id="service" 
								onChange={this.propChanged}
								value={integration.service}>
							<option value=''>Select one...</option>
							<option value='trello'>Trello</option>
							<option value='teamwork'>Teamwork</option>
						</Input>
					</Col>
				</FormGroup>
				{ integtation.service === 'trello' && 
					<FormGroup row>
						<Label for="service" sm={2}>Project</Label>
						<Col sm={10}>
							<ProjectsCombo name='project' value={integration.mappings.project} 
								onChange={this.propChanged} />
						</Col>
					</FormGroup>
				}
			</Form>
		)
	}
}