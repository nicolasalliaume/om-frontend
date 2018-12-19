import React, { Component } from 'react';
import { Row, Col, Card, CardBody, CardTitle } from 'reactstrap';
import StatusBars from '../misc/StatusBars';

export default class ProjectBalanceCard extends Component {
	render() {
		const { project } = this.props;
		if ( !project ) return <div/>;

		const income = project.billed_amount_total;
		const outcome = project.expenses_amount_total;
		const executed = Math.round( project.executed_hours_total );
		const max = Math.max( income, outcome );
		const hoursBilled = this.getHoursBilled();
		const billableHours = hoursBilled < project.executed_hours_total 
			? project.executed_hours_total - hoursBilled : 0;

		const bars = [
			{
				class : 'green',
				start : 0,
				width : ( income / ( income + outcome ) ) * 100,
			},{
				class : 'red',
				start : 0,
				width : 100
			}
		];

		return (
			<Card className='balance-card project-balance text-center'>
				<CardBody >
					<CardTitle>Project <b>balance</b></CardTitle>
					<Row>
						<Col xs={6}>
							<h6>Income</h6>
							<span className='money income'>{income.toFixed( 0 )}</span>
						</Col>
						<Col xs={6}>
							<h6>Outcome</h6>
							<span className='money outcome'>{outcome.toFixed( 0 )}</span>
						</Col>
					</Row>
					<Row>
						<Col xs={11} className='mx-auto'>
							<StatusBars config={bars} />
						</Col>
					</Row>
					<Row>
						<Col xs={6}>
							<h6>Executed</h6>
							<span className='balance-hours executed'>{executed}</span>
						</Col>
						<Col xs={6}>
							<h6>Billed</h6>
							<span className='balance-hours income'>{hoursBilled}</span>
						</Col>
					</Row>
					<Row>
						<Col xs={6}>
							<h6>Billable</h6>
							<span className='balance-hours billable'>{billableHours}</span>
						</Col>
						<Col xs={6}>
							<h6>$/HR</h6>
							<span className='money outcome'>{project.hourly_rate}</span>
						</Col>
					</Row>
				</CardBody>
			</Card>
		);
	}

	getHoursBilled() {
		const p = this.props.project;
		return p.hours_sold_unit === 'monthly' 
			? p.billed_hours_month 
			: p.billed_hours_total;
	}
}