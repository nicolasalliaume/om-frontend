import React, { Component } from 'react';
import update from 'immutability-helper';
import ProjectsCombo from '../../projects/utils/ProjectsCombo';
import KeyValueForm from './KeyValueForm';
import { 
	Col,
	Form,
	FormGroup,
	Label,
	Input,
	Row
} from 'reactstrap';

export default class EditIntegrationForm extends Component {
	propChanged = (event) => {
		const integration = update(this.props.integration, 
			{[event.target.name] : {$set: event.target.value}});
		this.props.onChange(integration);
	}

	projectChanged = (event) => {
		const integration = update(this.props.integration, 
			{mappings : { [event.target.name] : {$set: event.target.value}} });
		this.props.onChange(integration);
	}

	updateMappings = (mappings) => {
		this.props.onChange(update(this.props.integration, 
			{mappings: {$set: mappings}}
		))
	}

	updateMeta = (meta) => {
		this.props.onChange(update(this.props.integration, 
			{meta: {$set: meta}}
		))
	}

	render() {
		const { integration } = this.props;
		const { service, mappings, meta } = integration;
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
				{ (service === 'trello' || service === 'teamwork') &&
					<FormGroup row>
						<Label for="service" sm={2}>Service</Label>
						<Col sm={10}>
							<Input type="select" name="service" id="service" 
									onChange={this.propChanged}
									value={service}>
								<option value=''>Select one...</option>
								<option value='trello'>Trello</option>
								<option value='teamwork'>Teamwork</option>
							</Input>
						</Col>
					</FormGroup>
				}
				{ service === 'trello' && 
					<FormGroup row>
						<Label for="service" sm={2}>Project</Label>
						<Col sm={10}>
							<ProjectsCombo name='project' value={mappings.project} 
								onChange={this.projectChanged} />
						</Col>
					</FormGroup>
				}
				{ service === 'email' && 
					<FormGroup row>
						<Label sm={2}>Address</Label>
						<Col sm={10} className='align-self-center'>
							<Input static>om@on-lab.com</Input>
						</Col>
					</FormGroup>
				}
				{ service === 'teamwork' && 
					<div>
						<Row><Col xs={12}><h6 className='text-left'>Mappings</h6></Col></Row>
						<KeyValueForm values={mappings} onChange={this.updateMappings} />
					</div>
				}
				{ (service === 'trello' || service === 'teamwork') && 
					<div>
						<Row><Col xs={12}><h6 className='text-left'>Meta</h6></Col></Row>
						<KeyValueForm values={meta} onChange={this.updateMeta} />
					</div>
				}
			</Form>
		)
	}
}