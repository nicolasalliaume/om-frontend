import React, { Component } from 'react';
import { Row, Col, Card, CardBlock, CardTitle } from 'reactstrap';

export default class ProjectBalanceCard extends Component {
	getIncome(invoices) {
		return invoices.reduce((total, i) => total + i.amount, 0);
	}

	getOutcome() {
		return '--';
	}

	render() {
		const { project } = this.props;
		if (!project) return <div/>;

		const income = this.getIncome(project.invoices);
		const outcome = this.getOutcome();
		const executed = Math.ceil(project.executed_hours_total);

		return (
			<Card className='project-balance text-center'>
				<CardBlock className='card-body'>
					<CardTitle>Project <b>balance</b></CardTitle>
					<Row>
						<Col xs={6}>
							<h6>Income</h6>
							<span className='balance-amount income'>{income}</span>
						</Col>
						<Col xs={6}>
							<h6>Outcome</h6>
							<span className='balance-amount outcome'>{outcome}</span>
						</Col>
					</Row>
					<Row>
						<Col xs={6}>
							<h6>Hours</h6>
							<span className='balance-hours income'>{executed}</span>
						</Col>
						<Col xs={6}>
							<h6>$/HR</h6>
							<span className='balance-amount outcome'>{project.hourly_rate}</span>
						</Col>
					</Row>
				</CardBlock>
			</Card>
		)
	}
}