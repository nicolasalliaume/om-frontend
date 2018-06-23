import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import UserWorkEntriesCard from '../components/profile/work-entries/UserWorkEntriesCard';
import { fetchUserWorkEntriesIfNeeded, setWorkEntriesFilters } from '../actions/profile';

class Profile extends Component {
	componentWillMount() {
		this.fetchEntries(this.props);
	}

	componentWillReceiveProps(props) {
		this.fetchEntries(props);
	}

	fetchEntries(props) {
		const { 
			fetchUserWorkEntriesIfNeeded, 
			user: { _id }, 
			profileView: { workEntries: { filters } } 
		} = props;
		fetchUserWorkEntriesIfNeeded(_id, filters);
	}

	render() {
		const { user, profileView: { workEntries } } = this.props;
		return (
			<div className='dashboard'>
				<Row>
					<Col lg={4} xs={12}>
						<UserWorkEntriesCard 
						  workEntries={workEntries}
						  user={user} 
						  onFiltersChange={this.handleWorkEntriesFilterChange.bind(this)} />
					</Col>
				</Row>
			</div>
		)
	}

	handleWorkEntriesFilterChange(filters) {
		this.props.setWorkEntriesFilters(filters);
	}
}

const mapStateToProps = state => ({
	user: state.currentUser.user,
	profileView: state.profileView,
})

const mapDispatchToProps = dispatch => ({
	fetchUserWorkEntriesIfNeeded: (userId, filters) => dispatch(fetchUserWorkEntriesIfNeeded(userId, filters)),
	setWorkEntriesFilters: filters => dispatch(setWorkEntriesFilters(filters)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile);