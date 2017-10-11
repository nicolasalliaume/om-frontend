import React, { Component } from 'react';
import { Row, Col, Card, CardBlock, CardTitle, Button } from 'reactstrap';
import { connect } from 'react-redux';
import { fetchUsersListIfNeeded } from './../../../actions/users';
import UsersAdminCardListItem from './UsersAdminCardListItem';

class UsersAdminCard extends Component {
	componentWillMount() {
		this.props.fetchUsersListIfNeeded();
	}
	componentWillReceiveProps(props) {
		this.props.fetchUsersListIfNeeded();		
	}
	getSortedUsers() {
		return Object.values(this.props.usersCache.usersById)
			.sort((a, b) => {
				if (a.enabled && !b.enabled) return -1;
				if (!a.enabled && b.enabled) return 1;
				return a.full_name > b.full_name ? 1 : -1;
			})
	}
	render() {
		const { usersById } = this.props.usersCache;
		return (
			<Card className='users list'>
				<CardBlock className='card-body'>
					<CardTitle>Users</CardTitle>
					<ul>
						{ this.getSortedUsers().map(u => {
							return (
								<UsersAdminCardListItem key={u._id} user={u} />
							)
						}) }
					</ul>
				</CardBlock>
			</Card>
		)
	}
}

const mapDispatchToProps = dispatch => { return {
	fetchUsersListIfNeeded : () => dispatch(fetchUsersListIfNeeded())
}}

const mapStateToProps = state => { return {
	usersCache: state.cache.users
}}

export default connect(mapStateToProps, mapDispatchToProps)(UsersAdminCard);