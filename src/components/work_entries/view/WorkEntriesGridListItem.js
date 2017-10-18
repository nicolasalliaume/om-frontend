import React, { Component } from 'react';
import moment from 'moment';
import {
	Row,
	Col
} from 'reactstrap';

export default class WorkEntriesGridListItem extends Component {
	render() {
		const { entry } = this.props;
		const { time, user, created_ts } = entry;
		const date = moment.utc(created_ts);
		return (
			<li className='entry'>
				<Row>
					<Col xs={2}>
						<span className='date'>{date.format('MM/DD')}</span>
					</Col>
					<Col xs={2}>
						<span className='ago'>{date.fromNow()} ago</span>
					</Col>
					<Col xs={6}>
						<span className='user'>{user.full_name}</span>
					</Col>
					<Col xs={2}>
						<span className='time'>{(time/3600).toFixed(1)} hs</span>
					</Col>
				</Row>
			</li>
		)
	}
}