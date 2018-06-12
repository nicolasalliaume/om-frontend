import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Link, withRouter } from 'react-router-dom';
import { Container, Navbar, NavbarBrand, Nav, NavItem } from 'reactstrap';
import MessagesBar from '../components/messages/MessagesBar';
import Icon from '../components/misc/Icon';
import ViewObjectiveModalForm from '../components/objectives/forms/ViewObjectiveModalForm';
import IntroBanner from '../components/misc/IntroBanner';

import Dashboard from './Dashboard';
import Tasks from './Tasks';
import Integrations from './Integrations';
import Alarms from './Alarms';
import Billing from './Billing';
import Admin from './Admin';
import ProjectDashboard from './ProjectDashboard';
import CompanyOverview from './CompanyOverview';
import CompanyMonthOverview from './CompanyMonthOverview';
import ModalContainer from './ModalContainer';

import Store from '../store';

import { fetchProjectsListIfNeeded } from '../actions/projects';
import { fetchUsersListIfNeeded } from '../actions/users';


class Layout extends Component {
	componentWillMount() {
		/* load needed resources */
		Store.dispatch(fetchProjectsListIfNeeded());
		Store.dispatch(fetchUsersListIfNeeded());
	}

	isAdminUser() {
		return ['nico','fer','rafa'].includes(Store.getState().currentUser.user.username);
	}
	
	render() {
		const { pathname } = this.props.location;
		return (
			<div className={`layout ${pathname.replace(/\//g, '-').substring(1)}`}>
				<Navbar className='flex-column justify-content-start'>
					<NavbarBrand>OM</NavbarBrand>
					<Nav navbar className='text-center'>
						<NavItem>
							<Link to="/">
								<Icon fa-tachometer/>
							</Link>
						</NavItem>
						<NavItem>
							<Link to="/tasks">
								<Icon fa-list-ol/>
							</Link>
						</NavItem>
						{ this.isAdminUser() && 
							<NavItem>
								<Link to="/overview">
									<Icon fa-rocket/>
								</Link>
							</NavItem>
						}
						{ this.isAdminUser() && 
							<NavItem>
								<Link to="/billing">
									<Icon fa-dollar/>
								</Link>
							</NavItem>
						}
						<NavItem>
							<Link to="/integrations">
								<Icon fa-cogs/>
							</Link>
						</NavItem>
						<NavItem>
							<Link to="/alarms">
								<Icon fa-bell/>
							</Link>
						</NavItem>
						{ this.isAdminUser() && 
							<NavItem>
								<Link to="/admin">
									<Icon fa-cog/>
								</Link>
							</NavItem>
						}
					</Nav>
				</Navbar>
				<Container fluid id='main'>
					<MessagesBar />
					<LayoutRouter />
				</Container>

				<ModalContainer />

			</div>
		)
	}

	renderIntroBanners() {
		return <IntroBanner name="dark" />
	}
}

function isCacheLoaded(cache) {
	const { users, projects } = cache;
	return !users.isFetching && !users.didInvaidate && !projects.isFetching && !projects.didInvaidate;
}

const OverlayedObjectiveModal = connect(state => ({ cache: state.cache }))(function(props) {
	return (<ViewObjectiveModalForm 
		show={true} 
		objectiveId={props.objectiveId}
		toggle={props.toggle} />)
})

const LayoutRouter = withRouter(connect(state => ({ cache: state.cache }))(function(props) {
	// Wait to load the rest of the UI until the base resources are loaded
	if (isCacheLoaded(props.cache)) {
		return (
			<Switch>
				<Route path='/tasks' component={Tasks} />
				<Route path='/overview/:year/:month' component={CompanyMonthOverview} />
				<Route path='/overview' component={CompanyOverview} />
				<Route path='/project/:projectName' component={ProjectDashboard} />
				<Route path='/integrations' component={Integrations} />
				<Route path='/alarms' component={Alarms} />
				<Route path='/billing' component={Billing} />
				<Route path='/admin' component={Admin} />
				<Route path='/' component={Dashboard} />
			</Switch>
		)
	}
	return (<span/>);
}))

export default withRouter(Layout);