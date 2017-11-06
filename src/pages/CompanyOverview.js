import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';

import './../styles/CompanyOverview.css';

export default class CompanyOverview extends Component {
	render() {
		return (
			<div className='overview'>
				<Row>
					<Col lg={4} xs={12}>
						We're doing good.
					</Col>
				</Row>
			</div>
		)
	}
}