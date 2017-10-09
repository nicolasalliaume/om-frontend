import React, { Component } from 'react';
import { Col, Card, CardBlock, CardTitle } from 'reactstrap';
import { connect } from 'react-redux';
import { fetchProjectsBillingIfNeeded } from '../../../actions/projects';
import moment from 'moment';

class MonthlyInvoicesMissing extends Component {
	componentDidMount() {
		this.props.fetchProjectsBillingIfNeeded();
	}
	getMonthlyProjects() {
		return this.props.projects.filter(p => p.hours_sold_unit === 'monthly');
	}
	isInvoiceForThisMonth = (i) => {
		return moment.utc(i.invoicing_date).format('MM/YYYY') 
				=== moment.utc().format('MM/YYYY');
	}
	getProjectsWithoutInvoicesForThisMonth = (projects) => {
		return projects.filter(p => {
			return p.invoices.filter(this.isInvoiceForThisMonth).length === 0;
		})
	}
	render() {
		const monthlyProjects = this.getMonthlyProjects();
		const projectWithMissingInvoice = this.getProjectsWithoutInvoicesForThisMonth(monthlyProjects);
		console.log(projectWithMissingInvoice);
		const count = projectWithMissingInvoice.length;
		const toBe = count === 1 ? 'is' : 'are';
		const singular_plural = 'project' + (count === 1 ? '' : 's');
		return (
			<Card className='missing-invoice spaced'>
				<CardBlock className='card-body'>
					<CardTitle>Projects <b>missing invoices</b></CardTitle>
					{ count === 0 && 
						<p>There are no monthly projects missing invoices for this month</p> }
					{ count > 0 && 
						<div>
							<p>There {toBe} <b>{count}</b> monthly {singular_plural} missing an invoice for this month:</p> 
							<ul>
								{ projectWithMissingInvoice.map(p => {
									return (
										<li>{p.name}</li>
									)
								}) }
							</ul>
						</div>
					}
				</CardBlock>
			</Card>
		)
	}
}

const mapStateToProps = state => { return {
	projects: state.billingView.projectsBilling.projects
}}

const mapDispatchToProps = dispatch => { return {
	fetchProjectsBillingIfNeeded : () => dispatch(fetchProjectsBillingIfNeeded())
}}

export default connect(mapStateToProps, mapDispatchToProps)(MonthlyInvoicesMissing);