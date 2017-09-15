import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import ActivityListItem from './ActivityListItem';
import { connect } from 'react-redux';
import { fetchLatestActivityPageIfNeeded } from './../../actions/activity';

class LatestActivityList extends Component {
	componentDidMount() {
		this.props.fetchLatestActivityPageIfNeeded();
	}
	componentWillReceiveProps() {
		this.props.fetchLatestActivityPageIfNeeded();
	}
	render() {
		const { activityItemsByPage } = this.props.latestActivity;
		const activityItems = activityItemsByPage[1];
		return (
			<ul className='latest-activity-list'>
				{ activityItems && activityItems.map((a) => 
					<ActivityListItem activity={a} key={a._id} />
				) }
			</ul>
		)
	}
}

const mapStateToProps = state => { return {
	latestActivity : state.dashboardView.latestActivity
}}

const mapDispatchToProps = dispatch => { return {
	fetchLatestActivityPageIfNeeded : (page) => dispatch(fetchLatestActivityPageIfNeeded(page))
}}

export default connect(mapStateToProps, mapDispatchToProps)(LatestActivityList)