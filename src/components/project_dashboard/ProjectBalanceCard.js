import React, { Component } from 'react';
import { Row, Col, Card, CardBody, CardTitle } from 'reactstrap';
import StatusBars from '../misc/StatusBars';

export default class ProjectBalanceCard extends Component {
	render() {
		const { project } = this.props;
		if ( !project ) return <div/>;

		const { 
			billed_amount_total, 
			expenses_amount_total, 
			billed_hours_total, 
			executed_hours_total, 
			billed_hours_month,
			executed_hours_month, 
			hourly_rate
		} = project;

		const billable_hours = project.hours_sold_unit === 'monthly' 
			? ( billed_hours_month < executed_hours_month ? executed_hours_month - billed_hours_month : 0 )
			: ( billed_hours_total < executed_hours_total ? executed_hours_total - billed_hours_total : 0 );

		const bars = [
			{
				class : 'green',
				start : 0,
				width : ( billed_amount_total / ( billed_amount_total + expenses_amount_total ) ) * 100,
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
							<span className='money income'>{billed_amount_total.toFixed( 1 )}</span>
						</Col>
						<Col xs={6}>
							<h6>Outcome</h6>
							<span className='money outcome'>{expenses_amount_total.toFixed( 1 )}</span>
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
							<span className='balance-hours executed'>{executed_hours_total.toFixed( 1 )}</span>
						</Col>
						<Col xs={6}>
							<h6>Billed</h6>
							<span className='balance-hours income'>{billed_hours_total.toFixed( 1 )}</span>
						</Col>
					</Row>
					{ project.hours_sold_unit === 'monthly' && (
						<Row>
							<Col xs={6}>
								<h6>Executed Mo.</h6>
								<span className='balance-hours executed'>{executed_hours_month.toFixed( 1 )}</span>
							</Col>
							<Col xs={6}>
								<h6>Billed Mo.</h6>
								<span className='balance-hours income'>{billed_hours_month.toFixed( 1 )}</span>
							</Col>
						</Row>
					) }
					<Row>
						<Col xs={6}>
							<h6>Billable</h6>
							<span className='balance-hours billable'>{billable_hours.toFixed( 1 )}</span>
						</Col>
						<Col xs={6}>
							<h6>$/HR</h6>
							<span className='money outcome'>{hourly_rate}</span>
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