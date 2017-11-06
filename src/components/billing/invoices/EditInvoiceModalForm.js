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
import { addInvoiceToProject, updateInvoice } from '../../../actions/projects';

class EditInvoiceModalForm extends Component {
	constructor() {
		super();
		this.state = { 
			invoice : null
		}
	}
	componentWillMount() {
		const { invoice } = this.props;

		if (!this.props.edit) {
			this.setState({ invoice })
		} else {
			// format values to display
			this.setState({ invoice : update(invoice, {
				invoicing_date: {$set: moment(invoice.invoicing_date).format('YYYY-MM-DD')},
				project: {$set: invoice.project._id}
			})})
		}
		
	}
	submit = () => {
		const { invoice } = this.state;
		const { edit } = this.props;
		const isNew = !edit;

		if (isNew) this.props.addInvoiceToProject(invoice.project, invoice);
		else this.props.updateInvoice(invoice.project, invoice);

		this.props.toggle();
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
						<FormGroup row>
							<Label sm={2}>Project</Label>
							<Col sm={10}>
								<ProjectsCombo name='project' value={invoice.project} 
									onChange={this.onChange} />
							</Col>
						</FormGroup>
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
	addInvoiceToProject : (pid, invoice) => dispatch(addInvoiceToProject(pid, invoice)),
	updateInvoice : (pid, invoice) => dispatch(updateInvoice(pid, invoice))
}}

export default connect(null, mapDispatchToProps)(EditInvoiceModalForm);
