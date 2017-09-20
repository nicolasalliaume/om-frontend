import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import { fetchObjectivesSummaryForDateIfNeeded } from './../../../actions/objectives';

import MyObjectivesSummaryCard from './MyObjectivesSummaryCard';
import CompanyObjectivesSummaryCard from './CompanyObjectivesSummaryCard';

class ObjectivesSummaryPanel extends Component {
	componentDidMount() {
		this.props.fetchObjectivesSummaryForDateIfNeeded(this.props.visibleDate);
	}
	componentWillReceiveProps(props) {
		this.props.fetchObjectivesSummaryForDateIfNeeded(props.visibleDate);
	}
	render() {
		const { user, everyone } = this.props.objectivesSummary.summary;
		return (
			<Row className='objectives-summary'>
				<Col xs={12} sm={6}>
					<CompanyObjectivesSummaryCard {...everyone} />
				</Col>
				<Col xs={12} sm={6}>
					<MyObjectivesSummaryCard {...user} />
				</Col>
			</Row>
		)
	}
}

const mapStateToProps = state => { return {
	objectivesSummary : state.dashboardView.objectivesSummary,
	visibleDate : state.dashboardView.visibleDate
}}
const mapDispatchToProps = dispatch => { return {
	fetchObjectivesSummaryForDateIfNeeded : (date) => dispatch(fetchObjectivesSummaryForDateIfNeeded(date))
}}

export default connect(mapStateToProps, mapDispatchToProps)(ObjectivesSummaryPanel);