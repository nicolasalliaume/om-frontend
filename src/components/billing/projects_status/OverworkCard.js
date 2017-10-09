import React, { Component } from 'react';
import { Col, Card, CardBlock, CardTitle } from 'reactstrap';
import { connect } from 'react-redux';
import { fetchProjectsBillingIfNeeded } from '../../../actions/projects';

class OverworkCard extends Component {
	componentWillMount() {
		this.props.fetchProjectsBillingIfNeeded();
	}
	componentWillReceiveProps(props) {
		this.props.fetchProjectsBillingIfNeeded();
	}
	getOverworkedProjects() {
		if (!this.props.projects) return [];
		return this.props.projects
			.filter(p => { 
				const worked = p.hours_sold_unit === 'total' 
					? p.executed_hours_total : p.executed_hours_month;
				const sold = p.hours_sold;
				return worked > sold;
			})
	}
	render() {
		const projects = this.getOverworkedProjects();
		const count = projects.length;
		const toBe = count === 1 ? 'is' : 'are';
		const singular_plural = 'project' + (count === 1 ? '' : 's');
		return (
			<Card className='overwork-card spaced'>
				<CardBlock className='card-body text-center'>
					<CardTitle><b>Overwork</b></CardTitle>
					{ count === 0 && <p>There are no overworked projects</p> }
					{ count > 0 && <p>There {toBe} <b>{count}</b> overworked {singular_plural}</p> }
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

export default connect(mapStateToProps, mapDispatchToProps)(OverworkCard);