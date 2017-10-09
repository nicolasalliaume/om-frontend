import React, { Component } from 'react';
import { Col, Card, CardBlock, CardTitle } from 'reactstrap';
import { connect } from 'react-redux';
import { fetchProjectsBillingIfNeeded } from '../../../actions/projects';
import Icon from '../../misc/Icon';

class BillingOpportunities extends Component {
	componentWillMount() {
		this.props.fetchProjectsBillingIfNeeded();
	}
	componentWillReceiveProps(props) {
		this.props.fetchProjectsBillingIfNeeded();
	}
	
	getProjectsWithUnpaidWork() {
		if (!this.props.projects) return [];
		return this.props.projects.filter(p => {
			if (p.hours_sold_unit !== 'total') return false;
			return p.executed_hours_total > p.billed_hours_total;
		})
	}
	
	render() {
		return (
			<Card className='opportunities-card list spaced'>
				<CardBlock className='card-body'>
					<CardTitle>Billing <b>opportunities</b></CardTitle>
					<ul>
						{ this.getProjectsWithUnpaidWork().map(p => {
							const profit = Math.round((p.executed_hours_total - p.billed_hours_total) * p.hourly_rate);
							return (
								<li key={p._id} className='row'>
									<Col xs={8}><b>{p.name}</b></Col>
									<Col xs={4} className='text-right'>
										<Icon fa-dollar /> {profit}
									</Col>
								</li>
							)
						}) }
					</ul>
					<p className='reference'>
						A billing opportunity means that the team has work on a project 
						more hours than billed as today
					</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(BillingOpportunities);