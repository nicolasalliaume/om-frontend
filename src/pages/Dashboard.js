import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import ObjectivesSummaryPanel from './../components/objectives/summary/ObjectivesSummaryPanel';
import TodaysObjectivesPanel from './../components/objectives/all/TodaysObjectivesPanel';
import LatestActivityPanel from './../components/activity/LatestActivityPanel';
import CreateObjectiveFloatingButton from './../components/objectives/all/CreateObjectiveFloatingButton';

import './../styles/Dashboard.css';

export default class Dashboard extends Component {
	render() {
		return (
			<div className='dashboard'>
				<Row>
					<Col lg={6} xs={12}>
						<ObjectivesSummaryPanel />
						<LatestActivityPanel className='d-xs-none d-sm-none d-md-none d-lg-block' />
					</Col>
					<Col lg={6} xs={12}>
						<TodaysObjectivesPanel />
					</Col>
					<Col xs={12} className='small-activity d-xs-block d-sm-block d-md-block d-lg-none'>
						<LatestActivityPanel />
					</Col>
				</Row>
				<CreateObjectiveFloatingButton />
			</div>
		)
	}
}