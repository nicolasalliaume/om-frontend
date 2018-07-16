import React, { Component } from 'react';
import { connect } from 'react-redux';
import ObjectivesList from './../lists/ObjectivesList';
import { fetchObjectivesForDateIfNeeded } from './../../../actions/objectives';
import moment from 'moment';
import { setVisibleDate } from '../../../actions/dashboard';

class TodaysObjectivesPanel extends Component {
	componentDidMount() {
		this.props.fetchObjectivesForDateIfNeeded(this.props.visibleDate);
	}
	componentWillReceiveProps(props) {
		this.props.fetchObjectivesForDateIfNeeded(props.visibleDate);
	}
	render() {
		const { objectivesList: { objectivesByLevel }, visibleDate } = this.props;
		const date = this.getNaturalDateString(visibleDate)
		return (
			<div className='today-objectives'>
				<ObjectivesList showDateControls
					visibleDate={visibleDate}
					objectives={objectivesByLevel.day} 
					level='day' title={`Objectives for <b>${date}</b>`}
					onDateChanged={this.handleDayChanged.bind(this)} />
				<ObjectivesList objectives={objectivesByLevel.month} 
					level='month' title='Objectives for <b>this month</b>' />
				<ObjectivesList objectives={objectivesByLevel.year} 
					level='year' title='Objectives for <b>this year</b>' />
			</div>
		)
	}

	handleDayChanged(date) {
		this.props.setVisibleDate(date);
	}

	getNaturalDateString(date) {
		const F = 'YYYY-MM-DD';
		const now = moment();
		const nowF = now.format(F);
		const dateF = date.format(F);
		if (nowF === dateF) return 'today';
		if (now.clone().add(1, 'day').format(F) === dateF) return "tomorrow";
		if (now.clone().add(-1, 'day').format(F) === dateF) return "yesterday";
		return date.format('MM/DD');
	}
}

const mapStateToProps = state => {
  return {
    objectivesList 	: state.dashboardView.objectivesList,
    visibleDate		: state.dashboardView.visibleDate
  }
}

const mapDispatchToProps = dispatch => { return {
	fetchObjectivesForDateIfNeeded : (date) => dispatch(fetchObjectivesForDateIfNeeded(date)),
	setVisibleDate: date => dispatch(setVisibleDate(date)),
}}

export default connect(mapStateToProps, mapDispatchToProps)(TodaysObjectivesPanel);