import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { Container, Navbar, NavbarBrand, Nav, NavItem } from 'reactstrap';
import MessagesBar from '../components/messages/MessagesBar';
import Icon from '../components/misc/Icon';

import Dashboard from './Dashboard';
import Tasks from './Tasks';
import Integrations from './Integrations';

export default class App extends Component {
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
					</Switch>
				</Container>
			</div>
		)
	}
}