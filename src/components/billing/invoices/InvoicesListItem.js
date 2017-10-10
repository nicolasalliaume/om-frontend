import React, { Component } from 'react';
import { Col, Card, CardBlock, Button } from 'reactstrap';
import moment from 'moment';
import Icon from '../../misc/Icon';
import EditInvoiceModalForm from './EditInvoiceModalForm';
import { deleteInvoice } from '../../../actions/projects';
import { connect } from 'react-redux';
import Strings from '../../../strings/dialogs';
import { confirmAlert } from './../../misc/ConfirmDialog';

class InvoicesListItem extends Component {
	constructor() {
		super();
		this.state = { editModal : false }
	}
	
	toggleEditModal = () => this.setState({ editModal : !this.state.editModal })

	confirmDelete = () => {
		confirmAlert({
			title : 'Delete invoice',
			message : Strings.DELETE_INVOICE,
			confirmLabel : 'delete',
			cancelLabel : 'cancel',
			onConfirm : this.deleteInvoice
		})
	}

	deleteInvoice =  () => {
		const { invoice } = this.props;
		this.props.deleteInvoice(invoice.project._id, invoice._id);
	}
	
	render() {
		const { invoice } = this.props;
		const { paid, project, billed_hours, amount, invoicing_date } = invoice;
		const date = moment.utc(invoicing_date).format('MM/DD');
		const className = paid ? 'paid' : 'unpaid';
		return (
			<li className={`invoices-list-item ${className}`}>
				<Card>
					<CardBlock className='card-body row'>
						<Col xs={9}>
							<h4>{project.name}</h4>
						</Col>
						<Col xs={3} className='text-right list-item-options'>
							{ !invoice.paid && 
								<Button color='secondary' onClick={this.toggleEditModal}>
									<Icon fa-pencil tooltip="Edit" id={`edit-${invoice._id}`}/>
								</Button>
							}
							{ !invoice.paid && 
								<Button color='secondary' onClick={this.confirmDelete}>
									<Icon fa-remove tooltip="Delete" id={`delete-${invoice._id}`}/>
								</Button>
							}
						</Col>
						<Col xs={12}>
							<p>{invoice.description}</p>
						</Col>
						<Col xs={12}>
							<footer className='row'>
								<Col xs={4} className='date'><Icon fa-calendar-o />{date}</Col>
								<Col xs={4} className='hours'><Icon fa-clock-o />{billed_hours} Hrs</Col>
								<Col xs={4} className='money'><Icon fa-dollar />{amount}</Col>
							</footer>
						</Col>
					</CardBlock>
				</Card>
				<EditInvoiceModalForm edit show={this.state.editModal} 
					toggle={this.toggleEditModal} invoice={this.props.invoice} />
			</li>
		)
	}
}

const mapDispatchToProps = dispatch => { return {
	deleteInvoice : (projectId, invoiceId) => dispatch(deleteInvoice(projectId, invoiceId))
}}

export default connect(null, mapDispatchToProps)(InvoicesListItem);
