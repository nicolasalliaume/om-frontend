import React, { Component } from 'react';
import { Row, Col, Card, CardBody, CardTitle } from 'reactstrap';
import StatusBars from '../misc/StatusBars';

export default class ProjectBalanceCard extends Component {
	render() {
		const { project } = this.props;
		if (!project) return <div/>;

		const income = project.billed_amount_total;
		const outcome = project.expenses_amount_total;
		const executed = Math.round(project.executed_hours_total);
		const max = Math.max(income, outcome);

		const bars = [
			{
				class : 'green',
				start : 0,
				width : income === max ? 100 : (income/max)*100
			},{
				class : 'blue',
				start : 0,
				width : outcome === max ? 100 : (outcome/max)*100
			}
		]

		return (
			<Card className='project-balance text-center'>
				<CardBody >
					<CardTitle>Project <b>balance</b></CardTitle>
					<Row>
						<Col xs={6}>
							<h6>Income</h6>
							<span className='money income'>{income}</span>
						</Col>
						<Col xs={6}>
							<h6>Outcome</h6>
							<span className='money outcome'>{outcome}</span>
						</Col>
					</Row>
					<Row>
						<Col xs={11} className='mx-auto'>
							<StatusBars config={bars} />
						</Col>
					</Row>
					<Row>
						<Col xs={6}>
							<h6>Hours</h6>
							<span className='balance-hours income'>{executed}</span>
						</Col>
						<Col xs={6}>
							<h6>$/HR</h6>
							<span className='money outcome'>{project.hourly_rate}</span>
						</Col>
					</Row>
				</CardBody>
			</Card>
		)
	}
}