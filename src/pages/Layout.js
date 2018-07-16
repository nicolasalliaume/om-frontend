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
import Profile from './Profile';
import Alarms from './Alarms';
import Billing from './Billing';
import Admin from './Admin';
import ProjectDashboard from './ProjectDashboard';
import CompanyOverview from './CompanyOverview';
import CompanyMonthOverview from './CompanyMonthOverview';
import ModalContainer from './ModalContainer';

import Store from '../store';

import moment from 'moment';
import mouseTrap from 'react-mousetrap';

import { fetchProjectsListIfNeeded } from '../actions/projects';
import { fetchUsersListIfNeeded } from '../actions/users';


class Layout extends Component {
	constructor() {
		super();
		this.state = { overviewOpen: false }
		this.shortcutFns = {};
	}
	componentWillMount() {
		/* load needed resources */
		Store.dispatch(fetchProjectsListIfNeeded());
		Store.dispatch(fetchUsersListIfNeeded());

		this.setupShortcuts();
	}
	componentWillUnmount() {
		this.tearDownShortcuts();
	}

	isAdminUser() {
		return Store.getState().currentUser.user.is_admin;
	}

	setupShortcuts() {
		// bind functions only for available urls
		const links = this.getLinks();
		this.shortcutFns = Object.keys(links).reduce((o, k) => Object.assign(o, { [k]: this.shortcutFn(links[k]) }), {}); 
		this.shortcutsApply(this.props.bindShortcut);
	}

	tearDownShortcuts() {
		this.shortcutsApply(this.props.unbindShortcut);
	}
	
	/**
	 * Given a path, returns a function that when called will redirect
	 * to the given (closure) path
	 * 
	 * @param  {String} to 
	 * @return {Function}    
	 */
	shortcutFn = to => () => this.props.history.push(to);

	/**
	 * Calls the given function with the shortcut binding parameters.
	 * fn should be either bind or unbind.
	 * 
	 * @param  {Function} fn bindShortcut or unbindShortcut
	 */
	shortcutsApply(fn) {
		this.shortcutFns.dashboard && fn(['d'], this.shortcutFns.dashboard);
		this.shortcutFns.tasks && fn(['t'], this.shortcutFns.tasks);
		this.shortcutFns.overview_year && fn(['y'], this.shortcutFns.overview_year);
		this.shortcutFns.overview_month && fn(['m'], this.shortcutFns.overview_month);
		this.shortcutFns.billing && fn(['b'], this.shortcutFns.billing);
		this.shortcutFns.integrations && fn(['i'], this.shortcutFns.integrations);
		this.shortcutFns.alarms && fn(['a'], this.shortcutFns.alarms);
		this.shortcutFns.admin && fn(['q'], this.shortcutFns.admin);
		this.shortcutFns.profile && fn(['p'], this.shortcutFns.profile);
	}

	/**
	 * Returns an object with the available links for this user
	 * @return {Object} 
	 */
	getLinks = () => Object.assign({
		dashboard: '/',
		tasks: '/tasks',
		integrations: '/integrations',
		alarms: '/alarms',
		profile: '/profile',
	}, !this.isAdminUser() ? {} : {
		overview_year: '/overview',
		overview_month: `/overview/${moment().format('YYYY')}/${moment().format('MM')}`,
		billing: '/billing',
		admin: '/admin',
	})
	
	render() {
		const { pathname } = this.props.location;
		const { overviewOpen } = this.state;
		const links = this.getLinks();
		return (
			<div className={`layout ${pathname.replace(/\//g, '-').substring(1)}`}>
				<div className='navbar-wrapper'>
					<Navbar className='flex-column justify-content-start'>
						<NavbarBrand>OM</NavbarBrand>
						<Nav navbar className='text-center'>
							<NavItem>
								<LinkWithTooltip to={links.dashboard} id="Nav__Dashboard" tooltip="Dashboard (D)">
									<Icon fa-tachometer/>
								</LinkWithTooltip>
							</NavItem>
							<NavItem>
								<LinkWithTooltip to={links.tasks} id="Nav__Tasks" tooltip='Tasks (T)'>
									<Icon fa-list-ol/>
								</LinkWithTooltip>
							</NavItem>
							{ links.overview_year && links.overview_month && 
								<Dropdown nav direction="right" isOpen={overviewOpen} toggle={_ => this.setState({ overviewOpen: !overviewOpen }) }>
									<DropdownToggle nav>
										<Icon fa-rocket/>
									</DropdownToggle>
									<DropdownMenu>
										<DropdownItem>
											<Link to={links.overview_year}>
												YEAR
											</Link>
										</DropdownItem>
										<DropdownItem>
											<Link to={links.overview_month}>
												MONTH
											</Link>
										</DropdownItem>
									</DropdownMenu>
								</Dropdown>
							}
							{ links.billing && 
								<NavItem>
									<LinkWithTooltip to={links.billing} id="Nav__Billing" tooltip='Billing (B)'>
										<Icon fa-dollar/>
									</LinkWithTooltip>
								</NavItem>
							}
							<NavItem>
								<LinkWithTooltip to={links.integrations} id="Nav__Integrations" tooltip='Integrations (I)'>
									<Icon fa-cogs/>
								</LinkWithTooltip>
							</NavItem>
							<NavItem>
								<LinkWithTooltip to={links.alarms} id="Nav__Alarms" tooltip='Alarms (A)'>
									<Icon fa-bell/>
								</LinkWithTooltip>
							</NavItem>
							<NavItem>
								<LinkWithTooltip to={links.profile} id="Nav__Profile" tooltip='Profile (P)'>
									<Icon fa-user/>
								</LinkWithTooltip>
							</NavItem>
							{ links.admin && 
								<NavItem>
									<LinkWithTooltip to={links.admin} id="Nav__Admin" tooltip='Admin (Q)'>
										<Icon fa-cog/>
									</LinkWithTooltip>
								</NavItem>
							}
						</Nav>
					</Navbar>
				</div>
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
				<Route path='/profile' component={Profile} />
				<Route path='/' component={Dashboard} />
			</Switch>
		)
	}
	return (<span/>);
}))

export default withRouter(mouseTrap(Layout));