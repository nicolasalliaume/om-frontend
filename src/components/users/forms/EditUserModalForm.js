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
import { updateUser, createUser } from '../../../actions/users';

class EditUserModalForm extends Component {
	constructor() {
		super();
		this.state = { user : null }
	}
	componentWillMount() {
		const { user } = this.props;
		this.setState({ user })
	}
	submit = () => {
		const { user } = this.state;
		const { edit } = this.props;
		const isNew = !edit;

		if (isNew) this.props.createUser(user);
		else this.props.updateUser(user._id, user);

		this.props.toggle();
	}
	onChange = (event) => {
		const newState = update(this.state, 
			{user: {[event.target.name]: {$set: event.target.value}}});
		this.setState(newState)
	}
	render() {
		const { user } = this.state;
		const { edit, toggle } = this.props;
		const isNew = !edit;
		const op = isNew ? 'New' : 'Edit';

		return (
			<Modal isOpen={this.props.show} toggle={toggle} className={this.props.className}>
				<ModalHeader toggle={toggle}>{op} <b>user</b></ModalHeader>
				<ModalBody>
					{ user.profile_image && 
						<div className='profile-image-preview'>
							<div style={{backgroundImage: 'url('+user.profile_image+')'}}></div>
						</div>
					}
					<Form className='edit-user-form' onSubmit={e => e.preventDefault() && false}>
						<FormGroup row>
							<Label for='username' sm={2}>Username</Label>
							<Col sm={10} className='align-self-center'>
								<Input type="text" name="username" id="username" 
									onChange={this.onChange}
									value={user.username} />
							</Col>
						</FormGroup>
						{ isNew && 
							<FormGroup row>
								<Label for='password' sm={2}>Password</Label>
								<Col sm={10} className='align-self-center'>
									<Input type="text" name="password" id="password" 
										onChange={this.onChange}
										value={user.password} />
								</Col>
							</FormGroup>
						}
						<FormGroup row>
							<Label for="first_name" sm={2}>First name</Label>
							<Col sm={10} className='align-self-center'>
								<Input type="text" name="first_name" id="first_name" 
									onChange={this.onChange}
									value={user.first_name} />
							</Col>
						</FormGroup>
						<FormGroup row>
							<Label for="last_name" sm={2}>Last name</Label>
							<Col sm={10} className='align-self-center'>
								<Input type="text" name="last_name" id="last_name" 
									onChange={this.onChange}
									value={user.last_name} />
							</Col>
						</FormGroup>
						<FormGroup row>
							<Label for="profile_image" sm={2}>Profile image</Label>
							<Col sm={10} className='align-self-center'>
								<Input type="text" name="profile_image" id="profile_image" 
									onChange={this.onChange}
									value={user.profile_image} />
							</Col>
						</FormGroup>
						<FormGroup row>
							<Label for="email" sm={2}>Email</Label>
							<Col sm={10} className='align-self-center'>
								<Input type="text" name="email" id="email" 
									onChange={this.onChange}
									value={user.email} />
							</Col>
						</FormGroup>
						<FormGroup row>
							<Label for="trello_account" sm={2}>Trello account</Label>
							<Col sm={10} className='align-self-center'>
								<Input type="text" name="trello_account" id="trello_account" 
									onChange={this.onChange}
									value={user.trello_account} />
							</Col>
						</FormGroup>
						<FormGroup row>
							<Label for="slack_account" sm={2}>Slack username</Label>
							<Col sm={10} className='align-self-center'>
								<Input type="text" name="slack_account" id="slack_account" 
									onChange={this.onChange}
									value={user.slack_account} />
							</Col>
						</FormGroup>
						<FormGroup row>
							<Label for="git_account" sm={2}>Git account</Label>
							<Col sm={10} className='align-self-center'>
								<Input type="text" name="git_account" id="git_account" 
									onChange={this.onChange}
									value={user.git_account} />
							</Col>
						</FormGroup>
						<FormGroup row>
							<Col sm={6}>
								<FormGroup check>
									<Label check>
										<Input type="checkbox" name="is_admin" id="is_admin" 
											onChange={e => this.onChange({ target: {name: 'is_admin', value: e.target.checked} })} 
											checked={user.is_admin}/>{' '}
										Is admin
									</Label>
								</FormGroup>
							</Col>
						</FormGroup>
						<FormGroup row>
							<Col sm={6}>
								<FormGroup check>
									<Label check>
										<Input type="checkbox" name="notify_invoices" id="notify_invoices" 
											onChange={e => this.onChange({ target: {name: 'notify_invoices', value: e.target.checked} })} 
											checked={user.notify_invoices}/>{' '}
										Notify invoice added by freelancer
									</Label>
								</FormGroup>
							</Col>
						</FormGroup>
						<FormGroup row>
							<Col sm={6}>
								<FormGroup check>
									<Label check>
										<Input type="checkbox" name="is_freelancer" id="is_freelancer" 
											onChange={e => this.onChange({ target: {name: 'is_freelancer', value: e.target.checked} })} 
											checked={user.is_freelancer}/>{' '}
										Is freelancer
									</Label>
								</FormGroup>
							</Col>
						</FormGroup>
						{ user.is_freelancer && 
							<FormGroup row>
								<Label for="git_account" sm={2}>Hourly rate</Label>
								<Col sm={4} className='align-self-center'>
									<Input type="text" name="hourly_rate" id="hourly_rate" 
										onChange={this.onChange}
										value={user.hourly_rate} />
								</Col>
							</FormGroup>
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
	updateUser : (pid, update) => dispatch(updateUser(pid, update)),
	createUser : (user) => dispatch(createUser(user))
}}

export default connect(null, mapDispatchToProps)(EditUserModalForm);
