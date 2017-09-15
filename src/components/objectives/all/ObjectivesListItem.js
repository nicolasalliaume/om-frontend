import React, { Component } from 'react';
import { Row, Col, Button } from 'reactstrap';
import EditObjectiveModalForm from './../forms/EditObjectiveModalForm';

export default class ObjectivesListItem extends Component {
	constructor() {
		super();
		this.state = { editModal : false }
	}
	toggleEditModal = () => {
		this.setState({ editModal : !this.state.editModal })
	}
	render() {
		const { objective, index } = this.props;
		const description = objective.related_task ? objective.related_task.description : null;
		const title = objective.title.capitalizeFirst();
		return (
			<li className='objective list-item'>
				<Row>
					<Col xs={1}>
						<p className='list-number'>{index+1}</p>
					</Col>
					<Col xs={11}>
						<h4 className='objective-title'>{objective.title}</h4>
						{ description && <p className='objective-description'>{description}</p> }
					</Col>
					<Col xs={12} className='text-right'>
						<Button color='secondary' onClick={this.toggleEditModal}>
							<i className="fa fa-pencil" aria-hidden="true"></i>
						</Button>
					</Col>
				</Row>
				<EditObjectiveModalForm edit show={this.state.editModal} 
					toggle={this.toggleEditModal} objective={objective} />
			</li>
		)
	}
}