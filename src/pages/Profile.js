import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import UserWorkEntriesCard from '../components/profile/work-entries/UserWorkEntriesCard';
import UserSummaryCard from '../components/profile/summary/UserSummaryCard';
import SendInvoiceCard from '../components/profile/billing/SendInvoiceCard';
import UserInfoCard from '../components/profile/user/UserInfoCard';
import { fetchUserWorkEntriesIfNeeded, setWorkEntriesFilters } from '../actions/profile';
import { getNewInvoiceTemplate, roundToOneDecimal } from './../utils';
import { addInvoice } from '../actions/billing';

import './../styles/Profile.css';

class Profile extends Component {
	componentWillMount() {
		this.fetchEntries(this.props);
	}

	componentWillReceiveProps(props) {
		this.fetchEntries(props);
	}

	fetchEntries(props) {
		const { 
			fetchUserWorkEntriesIfNeeded, 
			user: { _id }, 
			profileView: { workEntries: { filters } } 
		} = props;
		fetchUserWorkEntriesIfNeeded(_id, filters);
	}

	render() {
		const { user, profileView: { workEntries } } = this.props;
		const summaryValues = this.getSummaryValues();
		return (
			<div className='profile'>
				<Row>
					<Col lg={4} xs={12}>
						<UserSummaryCard {...summaryValues} />
						{ user.is_freelancer && (
							<SendInvoiceCard 
						  	  invoice={this.invoiceTemplate()}
						  	  amount={summaryValues.to_bill} />
						)}
					</Col>
					<Col lg={4} xs={12}>
						<UserWorkEntriesCard 
						  workEntries={workEntries}
						  user={user} 
						  onFiltersChange={this.handleWorkEntriesFilterChange.bind(this)} />
					</Col>
					<Col lg={4} xs={12}>
						<UserInfoCard user={user} />
					</Col>
				</Row>
			</div>
		)
	}

	invoiceTemplate() {
		const { user, profileView: { workEntries: { entries } } } = this.props;
		const billingWe = entries.filter(we => !we.billed);
		const billingHours = roundToOneDecimal(billingWe.reduce((sum, we) => we.time + sum, 0) / 3600);
		const billingWeIds = billingWe.map(we => we._id);
		const amount = user.is_freelancer ? billingHours * (user.hourly_rate || 0) : 0;

		return getNewInvoiceTemplate({ 
			direction: 'in', 
			amount: amount,
			receiver: user.full_name,
			billed_hours: billingHours,
			work_entries: billingWeIds,
			description: `${billingHours} hours billed by ${user.full_name} for ${billingWe.length} work entries`,
		})
	}

	handleWorkEntriesFilterChange(filters) {
		this.props.setWorkEntriesFilters(filters);
	}

	getSummaryValues() {
		const values = {
			executed: 0,
			billed: 0,
			paid: 0,
			to_bill: 0,
		}
		this.props.profileView.workEntries.entries.forEach(we => {
			values.executed += we.time;
			if (we.billed) values.billed += we.time;
			else values.to_bill += we.time;
			if (we.paid) values.paid += we.time;
		})
		// convert to hours and round 'em all
		values.executed = roundToOneDecimal(values.executed/3600);
		values.billed = roundToOneDecimal(values.billed/3600);
		values.paid = roundToOneDecimal(values.paid/3600);
		values.to_bill = roundToOneDecimal(values.to_bill/3600);
		return values;
	}

	// sendInvoiceForActiveWorkEntries() {
	// 	const { addInvoice, user, profileView: { workEntries: { entries } } } = this.props;
	// 	const billingWe = entries.filter(we => !we.billed);
	// 	const billingHours = roundToOneDecimal(billingWe.reduce((sum, we) => we.time + sum, 0) / 3600);
	// 	const billingWeIds = billingWe.map(we => we._id);

	// 	addInvoice();
	// }
}

const mapStateToProps = state => ({
	user: state.currentUser.user,
	profileView: state.profileView,
})

const mapDispatchToProps = dispatch => ({
	fetchUserWorkEntriesIfNeeded: (userId, filters) => dispatch(fetchUserWorkEntriesIfNeeded(userId, filters)),
	setWorkEntriesFilters: filters => dispatch(setWorkEntriesFilters(filters)),
	addInvoice: invoice => dispatch(addInvoice(invoice)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile);