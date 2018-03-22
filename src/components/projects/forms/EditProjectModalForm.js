import React, { Component } from 'react';
import { connect } from 'react-redux';	
import { 
	Button, 
	Modal, 
	ModalHeader, 
	ModalBody, 
	ModalFooter,
	Form,
	FormGroup,
	Label,
	Col,
	Input
} from 'reactstrap';
import update from 'immutability-helper';
import { Endpoints } from '../../../actions/endpoints';
import { updateProject, addProject } from '../../../actions/projects';

class EditProjectModalForm extends Component {
	constructor() {
		super();
		this.state = { project : null }
	}
	componentWillMount() {
		const { project } = this.props;
		this.setState({ project })
	}
	submit = () => {
		const { project } = this.state;
		const { edit } = this.props;
		const isNew = !edit;

		if (isNew) this.props.addProject(project);
		else this.props.updateProject(project._id, project);

		this.props.toggle();
	}
	onChange = event => {
		console.log(event.target.name, event.target.value);
		const newState = update(this.state, 
			{project: {[event.target.name]: {$set: event.target.value}}});
		this.setState(newState)
	}
	onChangeCheckbox = event => {
		this.setState(update(this.state, 
			{project: {[event.target.name]: {$set: event.target.checked}}}));
	}
	onChangeImage = event => {
		console.log(event.target);
		this.setState(update(this.state, 
			{project: {[event.target.name]: {$set: event.target.files[0]}}}));
	}
	render() {
		const { project } = this.state;
		const { edit, toggle } = this.props;
		const isNew = !edit;
		const op = isNew ? 'New' : 'Edit';

		return (
			<Modal isOpen={this.props.show} toggle={toggle} className={this.props.className}>
				<ModalHeader toggle={toggle}>{op} <b>project</b></ModalHeader>
				<ModalBody>
					<Form className='edit-project-form' onSubmit={e => e.preventDefault() && false}>
						<FormGroup row>
							<Label for='name' sm={2}>Name</Label>
							<Col sm={10} className='align-self-center'>
								<Input type="text" name="name" id="name" 
									onChange={this.onChange}
									value={project.name} />
							</Col>
						</FormGroup>
						<FormGroup row>
							<Label for='company_name' sm={2}>Company name</Label>
							<Col sm={10} className='align-self-center'>
								<Input type="text" name="company_name" id="company_name" 
									onChange={this.onChange}
									value={project.company_name} />
							</Col>
							<Col sm={2}></Col>
							<Col sm={10}><span className='note'>This company name will be use for invoices</span></Col>
						</FormGroup>
						<FormGroup row>
							<Label for='hours_sold' sm={2}>Hours sold</Label>
							<Col sm={3} className='align-self-center'>
								<Input type="number" name="hours_sold" id="hours_sold" 
									onChange={this.onChange}
									value={project.hours_sold} />
							</Col>
							<Col sm={3} className='align-self-center'>
								<Input type="select" name="hours_sold_unit" id="hours_sold_unit" 
									onChange={this.onChange}
									value={project.hours_sold_unit}>
									<option value='total'>Total</option>
									<option value='monthly'>Monthly</option>
								</Input>
							</Col>
						</FormGroup>
						<FormGroup row>
							<Label for="hourly_rate" sm={2}>Hourly rate</Label>
							<Col sm={10} className='align-self-center'>
								<Input type="text" name="hourly_rate" id="hourly_rate" 
									onChange={this.onChange}
									value={project.hourly_rate} />
							</Col>
						</FormGroup>
						<hr/>
						<FormGroup row>
							<Col sm={6}>
								<FormGroup check>
									<Label check>
										<Input type="checkbox" name="featured" id="featured" 
											onChange={this.onChangeCheckbox} checked={project.featured}/>{' '}
										Feature project
									</Label>
								</FormGroup>
							</Col>
						</FormGroup>
						{ project.featured && 
							<div>
								<FormGroup row>
									<Label for='description' sm={2}>Description</Label>
									<Col sm={10} className='align-self-center'>
										<Input type="text" name="description" id="description" 
											onChange={this.onChange}
											value={project.description} />
									</Col>
								</FormGroup>
								<FormGroup row>
									<Label for='description_es' sm={2}>Description (ESP)</Label>
									<Col sm={10} className='align-self-center'>
										<Input type="text" name="description_es" id="description_es" 
											onChange={this.onChange}
											value={project.description_es} />
									</Col>
								</FormGroup>
								<FormGroup row>
									<Label for='featured_image' sm={2}>Featured image</Label>
									<Col sm={6} className='align-self-center'>
										<Input type="file" name="featured_image" id="featured_image" 
											onChange={this.onChangeImage} />
									</Col>
									<Col sm={4} className='align-self-center'>
										<div className='image-preview' style={{
											background: `url(${Endpoints.BASE_URL}/${project.featured_image})`
										}}></div>
									</Col>
								</FormGroup>
								<FormGroup row>
									<Label for='external_link' sm={2}>External Link</Label>
									<Col sm={10} className='align-self-center'>
										<Input type="text" name="external_link" id="external_link" 
											onChange={this.onChange}
											value={project.external_link} />
									</Col>
								</FormGroup>
								<FormGroup row>
									<Label for="type" sm={2}>Project type</Label>
									<Col sm={10}>
										<Input id='type' name='type' type="select" value={project.type || ''} onChange={this.onChange}>
											<option value=''>Select...</option>
											<option value='web'>Web development</option>
											<option value='mobile'>Mobile App</option>
											<option value='shopify'>Shopify</option>
										</Input>
									</Col>
								</FormGroup>
							</div>
						}
					</Form>
				</ModalBody>
				<ModalFooter>
					<Button color="primary" onClick={this.submit}>Done</Button>{' '}
					<Button color="secondary" onClick={toggle}>Cancel</Button>
				</ModalFooter>
			</Modal>
		)
	}
}

const mapDispatchToProps = dispatch => { return {
	updateProject : (pid, update) => dispatch(updateProject(pid, update)),
	addProject : (user) => dispatch(addProject(user))
}}

export default connect(null, mapDispatchToProps)(EditProjectModalForm);
