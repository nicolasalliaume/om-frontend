import React, { Component } from 'react';
import { Row, Col, Card, CardBlock, CardTitle } from 'reactstrap';
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
							<CardBlock className='card-body'>
								<CardTitle><b>Tasks</b> pool</CardTitle>
								<TasksListFilterBar />
								<PaginatedTasksList />
							</CardBlock>
						</Card>
					</Col>
					<Col lg={6} xs={12}>
						<Card className='new-task-card'>
							<CardBlock className='card-body'>
								<CardTitle>Add <b>new task</b></CardTitle>
								<AddNewTaskForm />
							</CardBlock>
						</Card>
					</Col>
				</Row>
			</div>
		)
	}
}