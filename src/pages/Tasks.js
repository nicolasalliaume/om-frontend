import React, { Component } from 'react';
import { Row, Col, Card, CardBody, CardTitle } from 'reactstrap';
import PaginatedTasksList from './../components/tasks/list/PaginatedTasksList';
import AddNewTaskForm from './../components/tasks/forms/AddNewTaskForm';
import TasksListFilterBar from './../components/tasks/list/TasksListFilterBar';

import './../styles/Tasks.css';

export default class Tasks extends Component {
	render() {
		return (
			<div className='tasks'>
				<Row>
					<Col lg={6} xs={12}>
						<Card className='tasks list list--large'>
							<CardBody >
								<CardTitle><b>Tasks</b> pool</CardTitle>
								<TasksListFilterBar />
								<PaginatedTasksList />
							</CardBody>
						</Card>
					</Col>
					<Col lg={6} xs={12}>
						<Card className='new-task-card'>
							<CardBody >
								<CardTitle>Add <b>new task</b></CardTitle>
								<AddNewTaskForm />
							</CardBody>
						</Card>
					</Col>
				</Row>
			</div>
		)
	}
}