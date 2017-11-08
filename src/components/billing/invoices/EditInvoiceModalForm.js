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
	Input,
	InputGroup
} from 'reactstrap';
import ProjectsCombo from '../../projects/utils/ProjectsCombo';
import update from 'immutability-helper';
import moment from 'moment';
import { numToWords } from '../../../utils';
import { addInvoice, updateInvoice } from '../../../actions/billing';

class EditInvoiceModalForm extends Component {
	constructor() {
		super();
		this.state = { 
			invoice: null,
			associatedToProject: false
		}
	}
	
	componentWillMount() {
		const { invoice } = this.props;

		if (!this.props.edit) {
			this.setState({ invoice, associatedToProject: invoice.direction === 'out' })
		} 
		else {
			// format values to display
			this.setState({ invoice : update(invoice, {
				invoicing_date: {$set: moment(invoice.invoicing_date).format('YYYY-MM-DD')},
				project: {$set: invoice.project ? invoice.project._id : ''},
				receiver: {$set: invoice.receiver ? invoice.receiver : ''}
			})});

			if (invoice.direction === 'out') {
				this.setState({ associatedToProject: true });
			} else {
				this.setState({ associatedToProject: !!invoice.project })
			}
		}
	}
	
	submit = () => {
		const { invoice } = this.state;
		const { edit } = this.props;
		const isNew = !edit;

		let invoiceData = invoice;
		if (invoiceData.project === '') {
			invoiceData = update(invoiceData, {project:{$set: null}})
		} else {
			invoiceData = update(invoiceData, {receiver:{$set: null}})
		}

		invoiceData = update(invoiceData, {created_by: {$set: invoiceData.created_by._id}});

		if (isNew) this.props.addInvoice(invoiceData);
		else this.props.updateInvoice(invoiceData);

		this.props.toggle();
	}

	toggleAssociatedToProject = event => {
		this.setState({ associatedToProject: event.target.value === 'y' })
		if (event.target.value === 'n') {
			this.setState({ invoice: update(this.state.invoice, { project: {$set: ''} }) });
		} else {
			this.setState({ invoice: update(this.state.invoice, { receiver: {$set: ''} }) });
		}
	}
	
	onChange = (event) => {
		const newState = update(this.state, 
			{invoice: {[event.target.name]: {$set: event.target.value}}});
		this.setState(newState)
	}
	
	onChangeCheckbox = (event) => {
		this.onChange({target: {
			name: event.target.name, 
			value: event.target.checked}});
	}

	onChangeFile = (event) => {
		this.setState({ invoice: update(this.state.invoice, {
			attachment: {$set: event.target.files[0]}
		}) })
	}
	
	render() {
		const { invoice } = this.state;
		const { edit, toggle } = this.props;
		const isNew = !edit;
		const op = isNew ? 'New' : 'Edit';
		const type = invoice.direction === 'in' ? 'expenses' : 'billing';

		return (
			<Modal isOpen={this.props.show} toggle={toggle} className={this.props.className}>
				<ModalHeader toggle={toggle}>{op} <b>{type} invoice</b></ModalHeader>
				<ModalBody>
					<Form className='edit-invoice-form' onSubmit={e => e.preventDefault() && false}>
						{ invoice.direction === 'in' &&
							<FormGroup row>
								<Label sm={3}>Related to project?</Label>
								<Col sm={2}>
									<FormGroup check>
										<Label check>
											<Input type="radio" name="associatedToProject" value='y'
												onChange={this.toggleAssociatedToProject} 
												checked={this.state.associatedToProject} />{' '}
											Yes
										</Label>
									</FormGroup>
								</Col>
								<Col sm={2}>
									<FormGroup check>
										<Label check>
											<Input type="radio" name="associatedToProject" value='n'
												onChange={this.toggleAssociatedToProject} 
												checked={!this.state.associatedToProject} />{' '}
											No
										</Label>
									</FormGroup>
								</Col>
							</FormGroup>
						}
						{ this.state.associatedToProject && 
							<FormGroup row>
								<Label sm={2}>Project</Label>
								<Col sm={10}>
									<ProjectsCombo name='project' value={invoice.project} 
										onChange={this.onChange} />
								</Col>
							</FormGroup>
						}
						{ !this.state.associatedToProject && 
							<FormGroup row>
								<Label sm={2}>Receiver</Label>
								<Col sm={10}>
									<Input type='text' name='receiver' id='receiver' 
										value={invoice.receiver} 
										onChange={this.onChange} />
								</Col>
							</FormGroup>
						}
						<FormGroup row>
							<Label for="invoicing_date" sm={2}>Invoicing date</Label>
							<Col sm={10} className='align-self-center'>
								<Input type="date" name="invoicing_date" id="invoicing_date" 
									onChange={this.onChange}
									value={invoice.invoicing_date} />
							</Col>
						</FormGroup>
						<FormGroup row>
							<Label for="description" sm={2}>Description</Label>
							<Col sm={10} className='align-self-center'>
								<Input type="textarea" name="description" id="description" 
									onChange={this.onChange}
									placeholder="What are you billing?" 
									value={invoice.description} />
							</Col>
						</FormGroup>
						<FormGroup row>
							<Label for="amount" sm={2}>Amount (USD)</Label>
							<Col sm={4} className='align-self-center'>
								<InputGroup>
									<span className="input-group-addon">$</span>
									<Input type="number" min={0} name="amount" id="amount" 
										onChange={this.onChange}
										value={invoice.amount} />
								</InputGroup>
							</Col>
							<Col sm={6} className='align-self-center'>
								<span className='money-text capitalize'>
									{ invoice.amount > 0 &&
										numToWords(invoice.amount) + ' US dollars'
									}
								</span>
							</Col>
						</FormGroup>
						<FormGroup row>
							<Label for="billed_hours" sm={2}>Hours billed</Label>
							<Col sm={3} className='align-self-center'>
								<Input type="number" className='text-right' 
									min={1} name="billed_hours" id="billed_hours" 
									onChange={this.onChange}
									value={invoice.billed_hours} />
							</Col>
						</FormGroup>
						{ invoice.direction === 'out' && 
							<FormGroup row>
								<Label for="number" sm={2}>Invoice number</Label>
								<Col sm={3} className='align-self-center'>
									<Input type="number" className='text-right' 
										min={1} name="number" id="number" 
										onChange={this.onChange}
										value={invoice.number} />
								</Col>
							</FormGroup>
						}
						{ invoice.direction === 'in' && 
							<FormGroup row>
								<Label for="attachment" sm={2}>Attachment</Label>
								<Col sm={10} className='align-self-center'>
									<Input type="file"
										name="attachment" id="attachment" 
										onChange={this.onChangeFile} />
								</Col>
							</FormGroup>
						}
						<FormGroup row>
							<Col sm={6}>
								<FormGroup check>
									<Label check>
										<Input type="checkbox" name="paid" id="paid" 
											onChange={this.onChangeCheckbox} 
											checked={invoice.paid} />{' '}
										Already paid?
									</Label>
								</FormGroup>
							</Col>
						</FormGroup>
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
	addInvoice : (invoice) => dispatch(addInvoice(invoice)),
	updateInvoice : (invoice) => dispatch(updateInvoice(invoice))
}}

export default connect(null, mapDispatchToProps)(EditInvoiceModalForm);
