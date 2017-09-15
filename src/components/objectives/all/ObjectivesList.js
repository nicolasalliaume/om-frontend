import React, { Component } from 'react';
import { Row, Col, Card, CardBlock, CardTitle, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import ObjectivesListItem from './ObjectivesListItem';
import EditObjectiveModalForm from './../forms/EditObjectiveModalForm';

export default class ObjectivesList extends Component {
	constructor() {
		super();
		this.state = { createObjModal : false }
	}
	toggleCreateObjectiveModal = () => {
		this.setState({ createObjModal : !this.state.createObjModal });
	}
	
	render() {
		const { objectives, level, title } = this.props;
		return (
			<Card className={`list list--large objectives ${level}`}>
				<CardBlock className='card-body'>
					<CardTitle dangerouslySetInnerHTML={{__html: title}} />
					{ objectives.empty() && this.renderNoObjectives() }
					{ !objectives.empty() && 
						<ul className={`objectives-list ${level}`}>
							{ objectives.map((o, idx) => 
								<ObjectivesListItem key={idx} objective={o} index={idx} />
							)}
						</ul> 
					}
				</CardBlock>
			</Card>
		)
	}

	renderNoObjectives() {
		return (
			<div className='list-empty'>
				<p className='empty-message-text'>
					<i className="fa fa-frown-o" aria-hidden="true"></i>{' '}
					You have no objectives for today
				</p>
				<Row className='empty-message-options'>
					<Col xs={3}></Col>
					<Col xs={6}>
						<Button color='secondary' onClick={this.showCreateObjective}>
							+ create one
						</Button>
						{' '}
						<Link to='/tasks'>
							<Button color='secondary'>
								view all tasks >
							</Button>
						</Link>
					</Col>
				</Row>
				<EditObjectiveModalForm show={this.state.toggleCreateObjectiveModal} 
					toggle={this.toggleCreateObjectiveModal} />
			</div>
		)
	}
}