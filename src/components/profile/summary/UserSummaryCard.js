import React from 'react';
import { Row, Col, Card, CardBody, CardTitle } from 'reactstrap';

export default function UserSummaryCard(props) {
	const { executed, billed, paid, to_bill } = props;
	return (
		<Card className='balance-card user-hours-balance text-center'>
			<CardBody >
				<CardTitle><b>summary</b></CardTitle>
				<Row>
					<Col xs={6}>
						<h6>Worked</h6>
						<span className='balance-hours worked'>{executed}</span>
					</Col>
					<Col xs={6}>
						<h6>Billed</h6>
						<span className='balance-hours billed'>{billed}</span>
					</Col>
				</Row>
				<hr/>
				<Row>
					<Col xs={6}>
						<h6>Paid</h6>
						<span className='balance-hours paid'>{paid}</span>
					</Col>
					<Col xs={6}>
						<h6>To Bill</h6>
						<span className='balance-hours to_bill'>{to_bill}</span>
					</Col>
				</Row>
			</CardBody>
		</Card>
	)
}