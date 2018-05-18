import React, { Component } from 'react';
import { Switch, Route, Link, withRouter } from 'react-router-dom';
import { Container, Navbar, NavbarBrand, Nav, NavItem } from 'reactstrap';
import MessagesBar from '../components/messages/MessagesBar';
import Icon from '../components/misc/Icon';
import ViewObjectiveModalForm from '../components/objectives/forms/ViewObjectiveModalForm';

import Dashboard from './Dashboard';
import Tasks from './Tasks';
import Integrations from './Integrations';
import Alarms from './Alarms';
import Billing from './Billing';
import Admin from './Admin';
import ProjectDashboard from './ProjectDashboard';
import CompanyOverview from './CompanyOverview';

import Store from '../store';

import { fetchProjectsListIfNeeded } from '../actions/projects';
import { fetchUsersListIfNeeded } from '../actions/users';


class Layout extends Component {
	componentDidMount() {
		/* load needed resources */
		Store.dispatch(fetchProjectsListIfNeeded());
		Store.dispatch(fetchUsersListIfNeeded());
	}

	objectiveIdToShow() {
		const { location } = this.props
		const regexp = /\/objective\/([a-zA-Z0-9]+)/;
		if ( regexp.test(location.pathname) ) {
			return location.pathname.match(regexp)[1];
		}
	}

	isAdminUser() {
		return ['nico','fer','rafa'].includes(Store.getState().currentUser.user.username);
	}
	
	render() {
		const { pathname } = this.props.location;
		const objectiveIdToShowInModal = this.objectiveIdToShow();
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
					<Switch>
						<Route path='/tasks' component={Tasks} />
						<Route path='/overview' component={CompanyOverview} />
						<Route path='/project/:projectName' component={ProjectDashboard} />
						<Route path='/integrations' component={Integrations} />
						<Route path='/alarms' component={Alarms} />
						<Route path='/billing' component={Billing} />
						<Route path='/admin' component={Admin} />
						<Route path='/' component={Dashboard} />
					</Switch>
				</Container>

				{ objectiveIdToShowInModal && (
					<ViewObjectiveModalForm 
						show={true} 
						objectiveId={objectiveIdToShowInModal}
						toggle={this.closeModalObjective.bind(this)} />)
				}
			</div>
		)
	}

	closeModalObjective() {
		this.props.history.replace('/');
	}
}

export default withRouter(Layout);
