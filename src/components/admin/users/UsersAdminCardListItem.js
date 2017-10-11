import React, { Component } from 'react';
import { connect } from 'react-redux';
import update from 'immutability-helper';
import AdminListItem from '../list/AdminListItem';
import EditUserModalForm from '../../users/forms/EditUserModalForm';
import { updateUser } from '../../../actions/users';

class UsersAdminCardListItem extends Component {
	constructor() {
		super();
		this.state = { editModal: false }
	}

	onEdit = () => this.toggleEditModal();

	onToggleEnabled = () => {
		const { user } = this.props;
		const updatedUser = update(user, {enabled: {$set: !user.enabled}});
		this.props.updateUser(updatedUser._id, updatedUser);
	}
	
	toggleEditModal = () => this.setState({ editModal: !this.state.editModal })
	
	render() {
		const { user } = this.props;
		const item = { label: user.full_name }
		return (
			<div>
				<AdminListItem 
					item={item} 
					className={user.enabled ? '' : 'disabled line-through'}
					options={['edit', 'enable']}
					onEdit={this.onEdit} 
					onEnable={this.onToggleEnabled}
					enabled={user.enabled}
					enableIcon='fa-user-plus'
					disableIcon='fa-user-times'
				/>
				<EditUserModalForm edit user={user} 
					show={this.state.editModal} 
					toggle={this.toggleEditModal} />
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => { return {
	updateUser : (uid, update) => dispatch(updateUser(uid, update))
}}

export default connect(null, mapDispatchToProps)(UsersAdminCardListItem);