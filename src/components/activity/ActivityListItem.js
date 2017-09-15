import React, { Component } from 'react';
import { Row, Col, Card, CardBlock } from 'reactstrap';
import moment from 'moment';

export default class ActivityListItem extends Component {
	render() {
		const { activity } = this.props;
		// const profileImage = activity.user.profile_image;
		const profileImage = 'http://lorempixel.com/200/200/cats/';
		return (
			<li className='activity-list-item'>
				<Card className='latest-activity'>
					<CardBlock className='card-body'>
						<Row className=''>
							<Col xs={12} className='text-right activity-item-meta'>
								<span>{moment(activity.created_ts).fromNow()}</span>
							</Col>
							<Col xs={2}>
								<div style={{backgroundImage: `url(${profileImage}`}}
									className='circle img-bg'/>
							</Col>
							<Col xs={10} className='description-col'>
								<p>{activity.description}</p>
							</Col>
						</Row>
					</CardBlock>
				</Card>
			</li>
		)
	}
}