import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import UsersAdminCard from '../components/admin/users/UsersAdminCard';
import ProjectsAdminCard from '../components/admin/projects/ProjectsAdminCard';
import AdminAddFloatingButton from '../components/admin/all/AdminAddFloatingButton';

import './../styles/Admin.css';

export default class Admin extends Component {
	render() {
		return (
			<div className='admin'>
				<Row>
					<Col lg={4} xs={12}>
						<UsersAdminCard />
					</Col>
					<Col lg={4} xs={12}>
						<ProjectsAdminCard />
					</Col>
				</Row>
				<AdminAddFloatingButton />
			</div>
		)
	}
}