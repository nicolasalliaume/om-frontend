import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { Container, Navbar, NavbarBrand, Nav, NavItem } from 'reactstrap';
import MessagesBar from '../components/messages/MessagesBar';
import Icon from '../components/misc/Icon';

import Dashboard from './Dashboard';
import Tasks from './Tasks';
import Integrations from './Integrations';
import Billing from './Billing';
import { connect } from 'react-redux';

class App extends Component {
	isAdminUser() {
		console.log(this.props.currentUser);
		return ['nico','fer','rafa'].includes(this.props.currentUser.user.username);
	}
	render() {
		return (
			<div className='layout'>
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
					</Nav>
				</Navbar>
				<Container fluid id='main'>
					<MessagesBar />
					<Switch>
						<Route exact path='/' component={Dashboard} />
						<Route path='/tasks' component={Tasks} />
						<Route path='/integrations' component={Integrations} />
						<Route path='/billing' component={Billing} />
					</Switch>
				</Container>
			</div>
		)
	}
}

const mapStateToProps = state => { return {
	currentUser: state.currentUser
}}

export default connect(mapStateToProps)(App);