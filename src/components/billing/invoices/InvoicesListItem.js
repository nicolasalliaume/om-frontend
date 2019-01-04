import React, { Component } from 'react';
import { Col, Card, CardBody, Button } from 'reactstrap';
import moment from 'moment';
import Icon from '../../misc/Icon';
import EditInvoiceModalForm from './EditInvoiceModalForm';
import { deleteInvoice, sendPaypalInvoice } from '../../../actions/billing';
import { connect } from 'react-redux';
import Strings from '../../../strings/dialogs';
import { confirmAlert } from './../../misc/ConfirmDialog';
import { Endpoints, EndpointAuthQuerystring } from '../../../actions/endpoints';
import { Link } from 'react-router-dom';
import { encodeProjectName } from '../../../utils';

class InvoicesListItem extends Component {
	constructor( props ) {
		super( props );
		this.state = { editModal : false };
	}
	
	toggleEditModal = () => this.setState( { editModal : !this.state.editModal } )

	confirmDelete = () => {
		confirmAlert( {
			title : 'Delete invoice',
			message : Strings.DELETE_INVOICE,
			confirmLabel : 'delete',
			cancelLabel : 'cancel',
			onConfirm : this.deleteInvoice
		} );
	}

	deleteInvoice = () => {
		const { invoice } = this.props;
		this.props.deleteInvoice( invoice._id );
	}

	renderInvoiceLink = () => {
		const { invoice } = this.props;
		return Endpoints.RENDER_INVOICE( invoice._id ) + EndpointAuthQuerystring();
	}

	sendInvoice = () => {
		const { invoice } = this.props;
		this.props.sendInvoice( invoice._id );
	}
	
	render() {
		const { invoice, sendEnabled } = this.props;
		const { paid, project, billed_hours, amount, invoicing_date, direction, receiver, number } = invoice;
		const date = moment.utc( invoicing_date ).format( 'MM/DD' );
		const className = paid ? 'paid' : ( invoice.paypal_invoice_id ? 'sent' : 'unpaid' );
		return (
			<li className={`invoices-list-item ${className}`}>
				<Card>
					<CardBody className='row'>
						<Col xs={8}>
							{ !!project && 
								<Link to={`/project/${encodeProjectName( project.name )}`}>
									<h4>{project.name}</h4>
								</Link>
							}
							{ direction === 'in' && !project && <h4>{receiver}</h4> }
						</Col>
						<Col xs={4} className='text-right list-item-options'>
							<Button color='secondary' onClick={this.toggleEditModal}>
								<Icon fa-pencil tooltip="Edit" id={`edit-${invoice._id}`}/>
							</Button>
							{ !invoice.paid && 
								<Button color='secondary' onClick={this.confirmDelete}>
									<Icon fa-remove tooltip="Delete" id={`delete-${invoice._id}`}/>
								</Button>
							}
							{ direction === 'out' && 
								<a className='btn' color='secondary' href={this.renderInvoiceLink()} 
									target='_blank' rel='nooption nofollow'>
									<Icon fa-file-pdf-o tooltip="View invoice" id={`view-${invoice._id}`}/>
								</a>
							}
							{ direction === 'out' && !invoice.paid &&
								<Button disabled={!sendEnabled} color='secondary' onClick={this.sendInvoice}>
									<Icon fa-paypal tooltip="Send PayPal Invoice" id={`send-${invoice._id}`}/>
								</Button>
							}
						</Col>
						<Col xs={12}>
							<p>{invoice.description}</p>
						</Col>
						{ invoice.attachment && 
							<Col xs={12} className='attachment-col'>
								<a href={invoice.attachment} target='_blank'
									rel='noopener nofollow' className='open-attachment'>
									<Icon fa-paperclip />
									See attachment
								</a>
							</Col>
						}
						<Col xs={12}>
							<footer className='row'>
								<Col xs={3} className='date'><Icon fa-calendar-o />{date}</Col>
								<Col xs={3} className='hours'><Icon fa-clock-o />{billed_hours} Hrs</Col>
								<Col xs={2} className='number'>{ number && <Icon fa-hashtag /> }{ number }</Col>
								<Col xs={4} className='amount'><Icon fa-dollar />{amount}</Col>
							</footer>
						</Col>
					</CardBody>
				</Card>
				<EditInvoiceModalForm edit show={this.state.editModal} 
					toggle={this.toggleEditModal} invoice={this.props.invoice} />
			</li>
		);
	}
}

const mapDispatchToProps = dispatch => ( {
	deleteInvoice : ( invoiceId ) => dispatch( deleteInvoice( invoiceId ) ),
	sendInvoice : ( invoiceId ) => dispatch( sendPaypalInvoice( invoiceId ) ),
} );

export default connect( null, mapDispatchToProps )( InvoicesListItem );
