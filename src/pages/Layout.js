import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { Container, Navbar, NavbarBrand, Nav, NavItem } from 'reactstrap';
import MessagesBar from '../components/messages/MessagesBar';
import Icon from '../components/misc/Icon';

import Dashboard from './Dashboard';
import Tasks from './Tasks';
import Integrations from './Integrations';
import Billing from './Billing';
import Admin from './Admin';
import ProjectDashboard from './ProjectDashboard';
import CompanyOverview from './CompanyOverview';

import Store from '../store';

import { fetchProjectsListIfNeeded } from '../actions/projects';

export default class Layout extends Component {
	componentDidMount() {
		/* load needed resources */
		Store.dispatch(fetchProjectsListIfNeeded());
	}

	isAdminUser() {
		return ['nico','fer','rafa'].includes(Store.getState().currentUser.user.username);
	}
	
	render() {
		console.log(this.props);
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
						<Route exact path='/' component={Dashboard} />
						<Route path='/tasks' component={Tasks} />
						<Route path='/overview' component={CompanyOverview} />
						<Route path='/project/:projectName' component={ProjectDashboard} />
						<Route path='/integrations' component={Integrations} />
						<Route path='/billing' component={Billing} />
						<Route path='/admin' component={Admin} />
					</Switch>
				</Container>
			</div>
		)
	}
}
