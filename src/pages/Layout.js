import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Link, withRouter } from 'react-router-dom';
import { Container, Navbar, NavbarBrand, Nav, NavItem, Dropdown, 
	DropdownToggle, DropdownMenu, DropdownItem 
} from 'reactstrap';
import LinkWithTooltip from '../components/misc/LinkWithTooltip';
import MessagesBar from '../components/messages/MessagesBar';
import Icon from '../components/misc/Icon';
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
import moment from 'moment';

import { fetchProjectsListIfNeeded } from '../actions/projects';
import { fetchUsersListIfNeeded } from '../actions/users';


class Layout extends Component {
	constructor() {
		super();
		this.state = { overviewOpen: false }
	}
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
		const { overviewOpen } = this.state;
		const now = moment();
		return (
			<div className={`layout ${pathname.replace(/\//g, '-').substring(1)}`}>
				<Navbar className='flex-column justify-content-start'>
					<NavbarBrand>OM</NavbarBrand>
					<Nav navbar className='text-center'>
						<NavItem>
							<LinkWithTooltip to="/" id="Nav__Dashboard" tooltip="Dashboard">
								<Icon fa-tachometer/>
							</LinkWithTooltip>
						</NavItem>
						<NavItem>
							<LinkWithTooltip to="/tasks" id="Nav__Tasks" tooltip='Tasks'>
								<Icon fa-list-ol/>
							</LinkWithTooltip>
						</NavItem>
						{ this.isAdminUser() && 
							<Dropdown nav direction="right" isOpen={overviewOpen} toggle={_ => this.setState({ overviewOpen: !overviewOpen }) }>
								<DropdownToggle nav>
									<Icon fa-rocket/>
								</DropdownToggle>
								<DropdownMenu>
									<DropdownItem>
										<Link to="/overview">
											YEAR
										</Link>
									</DropdownItem>
									<DropdownItem>
										<Link to={`/overview/${now.format('YYYY')}/${now.format('MM')}`}>
											MONTH
										</Link>
									</DropdownItem>
								</DropdownMenu>
							</Dropdown>
						}
						{ this.isAdminUser() && 
							<NavItem>
								<LinkWithTooltip to="/billing" id="Nav__Billing" tooltip='Billing'>
									<Icon fa-dollar/>
								</LinkWithTooltip>
							</NavItem>
						}
						<NavItem>
							<LinkWithTooltip to="/integrations" id="Nav__Integrations" tooltip='Integrations'>
								<Icon fa-cogs/>
							</LinkWithTooltip>
						</NavItem>
						<NavItem>
							<LinkWithTooltip to="/alarms" id="Nav__Alarms" tooltip='Alarms'>
								<Icon fa-bell/>
							</LinkWithTooltip>
						</NavItem>
						{ this.isAdminUser() && 
							<NavItem>
								<LinkWithTooltip to="/admin" id="Nav__Admin" tooltip='Admin'>
									<Icon fa-cog/>
								</LinkWithTooltip>
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