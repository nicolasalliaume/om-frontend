import React, { Component } from 'react';
import { Row, Col, Card, CardBlock, CardTitle, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import ObjectivesListItem from './ObjectivesListItem';
import EditObjectiveModalForm from './../forms/EditObjectiveModalForm';
import Icon from '../../misc/Icon';
import { getNewObjectiveTemplate } from '../../../utils';

export default class ObjectivesList extends Component {
	constructor() {
		super();
		this.state = { createObjModal : false }
	}
	toggleCreateObjectiveModal = () => {
		this.setState({ createObjModal : !this.state.createObjModal });
	}
	sortedObjectives = () => {
		return this.props.objectives.sort((a, b) => {
			const sa = a.scratched ? 2 : a.progress === 1 ? 1 : 0;
			const sb = b.scratched ? 2 : b.progress === 1 ? 1 : 0;
			return sa < sb ? -1 : 1;
		})
	}
	render() {
		const { level, title } = this.props;
		// sort objectives, scratched at the end
		const sortedObjectives = this.sortedObjectives();
		return (
			<Card className={`list list--large objectives ${level}`}>
				<CardBlock className='card-body'>
					<CardTitle dangerouslySetInnerHTML={{__html: title}} />
					{ sortedObjectives.empty() && this.renderNoObjectives() }
					{ !sortedObjectives.empty() && 
						<ul className={`objectives-list ${level}`}>
							{ sortedObjectives.map((o, idx) => 
								<ObjectivesListItem key={o._id} objective={o} index={idx} />
							)}
						</ul> 
					}
				</CardBlock>
			</Card>
		)
	}

	renderNoObjectives() {
		const { level } = this.props;
		return (
			<div className='list-empty'>
				<p className='empty-message-text'>
					<Icon fa-frown-o />{' '}
					You have no objectives for{' '}
					{level === 'day' ? 'today' : level === 'month' ? 'this month' : 'this year'}
				</p>
				<Row className='empty-message-options'>
					<Col xs={3}></Col>
					<Col xs={6}>
						<Button color='secondary' onClick={this.toggleCreateObjectiveModal}>
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
				<EditObjectiveModalForm show={this.state.createObjModal} 
					toggle={this.toggleCreateObjectiveModal} objective={getNewObjectiveTemplate(level)} />
			</div>
		)
	}

}