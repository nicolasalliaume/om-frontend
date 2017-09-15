import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { Container, Navbar, NavbarBrand, Nav, NavItem } from 'reactstrap';

import Dashboard from './Dashboard';
import Tasks from './Tasks';

export default class App extends Component {
	render() {
		return (
			<div className='layout'>
				<Navbar className='flex-column justify-content-start'>
					<NavbarBrand>OM</NavbarBrand>
					<Nav navbar className='text-center'>
						<NavItem>
							<Link to="/">
								<i className="fa fa-tachometer" aria-hidden="true"></i>
							</Link>
						</NavItem>
						<NavItem>
							<Link to="/tasks">
								<i className="fa fa-shopping-basket" aria-hidden="true"></i>
							</Link>
						</NavItem>
					</Nav>
				</Navbar>
				<Container fluid id='main'>
					<Switch>
						<Route exact path='/' component={Dashboard} />
						<Route path='/tasks' component={Tasks} />
					</Switch>
				</Container>
			</div>
		)
	}
}