import React, { Component } from 'react';
import moment from 'moment';
import Icon from '../../misc/Icon';
import {
	Row,
	Col,
	Button
} from 'reactstrap';

export default class WorkEntriesListItem extends Component {
	render() {
		const { entry } = this.props;
		const { time, user, created_ts } = entry;
		const date = moment.utc(created_ts);
		return (
			<li className='row entry text-left'>
				<Col xs={9}>
					<h4 className='user'><b>{user.full_name}</b></h4>
				</Col>
				{/* <Col xs={3} className='text-right list-item-options'>
					<Button color='secondary'>
						<Icon fa-pencil tooltip="Edit" id={`edit-${entry._id}`}/>
					</Button>
					<Button color='secondary'>
						<Icon fa-remove tooltip="Delete" id={`delete-${entry._id}`}/>
					</Button>
				</Col> */}
				<Col xs={12}>
					<p className='description'>{entry.objective.related_task.title}</p>
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