import React, { Component } from 'react';
import moment from 'moment';
import { Col } from 'reactstrap';

export default class WorkEntriesListItem extends Component {
	render() {
		const { entry, showProject, showUser } = this.props;
		const { time, user, created_ts } = entry;
		const date = moment.utc(created_ts);

		let clazz = entry.paid === true ? 'paid ' : (entry.paid === false ? 'unpaid ' : '');
		clazz += entry.billed === true ? 'billed ' : (entry.billed === false ? 'not-billed ' : '');

		return (
			<li className={`row entry text-left ${clazz}`}>
				{ showUser && 
					<Col xs={9}>
						<h4 className='user'><b>{user.full_name}</b></h4>
					</Col>
				}
				{/* <Col xs={3} className='text-right list-item-options'>
					<Button color='secondary'>
						<Icon fa-pencil tooltip="Edit" id={`edit-${entry._id}`}/>
					</Button>
					<Button color='secondary'>
						<Icon fa-remove tooltip="Delete" id={`delete-${entry._id}`}/>
					</Button>
				</Col> */}
				{ showProject && entry.objective.related_task && 
					<Col xs={9}>
						<h4 className='project'><b>{entry.objective.related_task.project.name}</b></h4>
					</Col>
				}
				<Col xs={12}>
					<p className='description'>
						{ entry.objective.related_task && entry.objective.related_task.title }
						{ !entry.objective.related_task && entry.objective.no_task_title }
					</p>
				</Col>
				<Col xs={12}>
					<footer className='row'>
						<Col xs={4}>
							<span className='time'>{(time/3600).toFixed(1)} hs</span>
						</Col>
						<Col xs={4}>
							<span className='date'>{date.format('MM/DD')}</span>
						</Col>
						<Col xs={4} className='text-right'>
							<span className='ago'>{date.fromNow()} ago</span>
						</Col>
					</footer>
				</Col>
			</li>
		)
	}
}