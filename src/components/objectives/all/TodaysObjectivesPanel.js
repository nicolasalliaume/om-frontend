import React, { Component } from 'react';
import { connect } from 'react-redux';
import ObjectivesList from './../lists/ObjectivesList';
import { fetchObjectivesForDateIfNeeded } from './../../../actions/objectives';

class TodaysObjectivesPanel extends Component {
	componentDidMount() {
		this.props.fetchObjectivesForDateIfNeeded(this.props.visibleDate);
	}
	componentWillReceiveProps(props) {
		this.props.fetchObjectivesForDateIfNeeded(props.visibleDate);
	}
	render() {
		const { objectivesByLevel } = this.props.objectivesList;
		return (
			<div className='today-objectives'>
				<ObjectivesList objectives={objectivesByLevel.day} 
					level='day' title='Objectives for <b>today</b>' />
				<ObjectivesList objectives={objectivesByLevel.month} 
					level='month' title='Objectives for <b>this month</b>' />
				<ObjectivesList objectives={objectivesByLevel.year} 
					level='year' title='Objectives for <b>this year</b>' />
			</div>
		)
	}
}

const mapStateToProps = state => {
  return {
    objectivesList 	: state.dashboardView.objectivesList,
    visibleDate		: state.dashboardView.visibleDate
  }
}

const mapDispatchToProps = dispatch => { return {
	fetchObjectivesForDateIfNeeded : (date) => dispatch(fetchObjectivesForDateIfNeeded(date))
}}

export default connect(mapStateToProps, mapDispatchToProps)(TodaysObjectivesPanel);