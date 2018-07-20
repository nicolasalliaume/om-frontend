import React, { Component } from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';
import { fetchUsersListIfNeeded } from './../../../actions/users';

class UsersMultiSelect extends Component {
	componentDidMount() {
		this.fetchIfNecessary()
	}
	fetchIfNecessary() {
		this.props.fetchUsersListIfNeeded();
	}
	onChange = (value) => {
		// dispatch generated event to parent component
		const event = {
			target : { 
				name  : this.props.name,
				value : value.map(o => o.value) // send back an array of user objects
			}
		}
		this.props.onChange(event);
	}

	classes = () => (this.props.className || '') + ' form-control no-placeholder ' + (this.props.invalid ? 'is-invalid' : '');
	
	/**
	 * Returns an array of option objects, containing the
	 * user's name as label and the user object as value
	 * 
	 * @return {Array}
	 */
	options = () => {
		const { usersById } = this.props.usersCache;
		return Object.values(usersById)
				.filter(u => u.enabled)
				.map(u => { return { label: u.full_name, value: u }});
	}

	/**
	 * We get as value an array of user objects.
	 * Here we map that to option objects (label/value)
	 * 
	 * @param  {Array} users
	 * @return {Array}       The options we should display as value
	 */
	mapCurrentValue = (users) => {
		const userIds = users.map(u => u._id);
		return this.options().filter(o => userIds.includes(o.value._id))
	}
	
	render() {
		const options = this.options();
		const disabled = options.length === 0;
		const { className, value, ...props } = this.props;

		const _value = this.mapCurrentValue(value);

		return (
			<Select clearable={false} disabled={disabled} 
				className={this.classes()} multi={true} {...props} 
				value={_value} options={options} onChange={this.onChange} />
		)
	}
}

const mapStateToProps = state => { return {
	usersCache : state.cache.users
}}

const mapDispatchToProps = dispatch => { return {
	fetchUsersListIfNeeded : () => dispatch(fetchUsersListIfNeeded())
}}

export default connect(mapStateToProps, mapDispatchToProps)(UsersMultiSelect);
