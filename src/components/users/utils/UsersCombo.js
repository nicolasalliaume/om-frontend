import React, { Component } from 'react';
import { Input } from 'reactstrap';
import { connect } from 'react-redux';
import { fetchUsersListIfNeeded } from './../../../actions/users';

class UsersCombo extends Component {
	constructor() {
		super();
		this.state = { selected: null }
	}
	componentDidMount() {
		this.fetchIfNecessary()
	}
	fetchIfNecessary() {
		this.props.fetchUsersListIfNeeded();
	}
	selectUser = (event) => {
		const selected = event.target.value;
		this.setState({ selected })
		this.props.onChange(selected);
	}
	render() {
		const { usersCache } = this.props;
		let users = [];

		if (usersCache !== undefined) {
			const { usersById } = usersCache;
			users = Object.values(usersById);
		}

		const disabled = users.length === 0;
		
		return (
			<Input type="select" name="users-list" id="users-list" 
					value={this.state.selected} disabled={disabled}
					onChange={this.selectUser} placeholder=".....loading....">
				{ users.map(u => 
					<option key={u._id} value={u._id}>{u.full_name}</option>
				)}
				{ disabled && <option value={null}>Loading...</option> }
			</Input>
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