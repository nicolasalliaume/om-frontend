import React, { Component } from 'react';
import { Card, CardBlock, CardTitle } from 'reactstrap';
import { connect } from 'react-redux';
import { fetchProjectsBillingIfNeeded } from '../../../actions/projects';

class BillingOpportunities extends Component {
	componentDidMount() {
		this.props.fetchProjectsBillingIfNeeded();
	}
	
	render() {
		return (
			<Card className='opportunities spaced'>
				<CardBlock className='card-body'>
					<CardTitle>Billing <b>opportunities</b></CardTitle>
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