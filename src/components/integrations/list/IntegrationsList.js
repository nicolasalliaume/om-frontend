import React, { Component } from 'react';
import { Row } from 'reactstrap';
import IntegrationCard from './IntegrationCard';
import { connect } from 'react-redux';
import { fetchIntegrationsIfNeeded } from '../../../actions/integrations';

class IntegrationsList extends Component {
	componentDidMount() {
		this.props.fetchIntegrationsIfNeeded()
	}
	componentWillReceiveProps(props) {
		this.props.fetchIntegrationsIfNeeded();
	}
	render() {
		return (
				<Row>
				{ this.props.integrations.integrationsList.map(i => {
					return <IntegrationCard key={i._id} integration={i} />
				})}
			</Row>
		);
	}
}

const mapStateToProps = state => { return {
	integrations : state.integrations
}}

const mapDispatchToProps = dispatch => { return {
	fetchIntegrationsIfNeeded : () => dispatch(fetchIntegrationsIfNeeded())
}}

export default connect(mapStateToProps, mapDispatchToProps)(IntegrationsList);