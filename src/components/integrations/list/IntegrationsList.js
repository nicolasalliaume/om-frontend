import React, { Component } from 'react';
import { Row } from 'reactstrap';
import IntegrationCard from './IntegrationCard';
import { connect } from 'react-redux';
import { fetchIntegrations } from '../../../actions/admin';

class IntegrationsList extends Component {
	componentDidMount() {
		this.props.fetchIntegrations()
	}
	render() {
		return (
				<Row>
				{ this.props.integrations.map(i => {
					return <IntegrationCard key={i._id} integration={i} />
				})}
			</Row>
		);
	}
}

const mapStateToProps = state => { return {
	integrations : state.integrations.integrationsList
}}

const mapDispatchToProps = dispatch => { return {
	fetchIntegrations : () => dispatch(fetchIntegrations())
}}

export default connect(mapStateToProps, mapDispatchToProps)(IntegrationsList);