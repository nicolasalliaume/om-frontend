import React, { Component } from 'react';
import { Row } from 'reactstrap';
import AlarmCard from './AlarmCard';
import { connect } from 'react-redux';
import { fetchAlarmsIfNeeded } from '../../../actions/alarms';

class AlarmsList extends Component {
	componentDidMount() {
		this.props.fetchAlarmsIfNeeded()
	}
	componentWillReceiveProps(props) {
		this.props.fetchAlarmsIfNeeded();
	}
	render() {
		return (
			<Row>
				{ this.props.alarms.alarmsList.map(a => {
					return <AlarmCard key={a._id} alarm={a} />
				})}
			</Row>
		);
	}
}

const mapStateToProps = state => { return {
	alarms : state.alarms
}}

const mapDispatchToProps = dispatch => { return {
	fetchAlarmsIfNeeded : () => dispatch(fetchAlarmsIfNeeded())
}}

export default connect(mapStateToProps, mapDispatchToProps)(AlarmsList);