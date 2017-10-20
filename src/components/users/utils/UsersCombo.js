import React, { Component } from 'react';
import { connect } from 'react-redux';
import EntityCombo from '../../misc/EntityCombo';
import { fetchUsersListIfNeeded } from './../../../actions/users';

class UsersCombo extends Component {
	getUserOptions = (usersById) => {
		return Object.values(usersById)
			.filter(u => u.enabled)
			.map(u => { return {label: u.full_name, value: u._id} })
	}

	render() {
		return (
			<EntityCombo async 
				items={this.getUserOptions(this.props.usersCache.usersById)} 
				fetchItems={this.props.fetchUsersListIfNeeded} 
				{...this.props} /> 
			)
	}
}

const mapStateToProps = state => { return {
	usersCache : state.cache.users
}}

const mapDispatchToProps = dispatch => { return {
	fetchUsersListIfNeeded : () => dispatch(fetchUsersListIfNeeded())
}}

export default connect(mapStateToProps, mapDispatchToProps)(UsersCombo);