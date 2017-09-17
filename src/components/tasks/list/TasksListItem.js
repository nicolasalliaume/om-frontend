import React, { Component } from 'react';
import { Col, Button } from 'reactstrap';
import { connect } from 'react-redux';
import { createObjectiveFromTask } from './../../../actions/objectives';
import { withRouter } from 'react-router-dom';
import Icon from './../../misc/Icon';
import DescriptionModal from './../../misc/DescriptionModal';

class TasksListItem extends Component {
	constructor() {
		super();
		this.state = { descriptionModal: false }
	}
	toggleDescriptionModal = () => {
		this.setState({ descriptionModal: !this.state.descriptionModal });
	}
	addToObjectives = () => {
		const { task, createObjectiveFromTask } = this.props;
		createObjectiveFromTask(task);
		this.navigateToDashboard();
	}
	navigateToDashboard() {
		this.props.history.push('/');
	}
	render() {
		const { task, index } = this.props;
		const hasDescription = !!task.description;
		return (
			<li className='tasks-list-item row'>
				<Col xs={1}>
					<p className={`list-number ${index>=99 ? 'hundreds' : ''}`}>{index + 1}</p>
				</Col>
				<Col xs={11}>
					<h4><b>{task.project.name}</b>{':  '}{task.title}</h4>
					{ task.description && <p>{task.description.trimToWords(400)}</p> }
				</Col>
				<Col xs={12} className='text-right list-item-bottom-options'>
					{ hasDescription &&
						<Button color='secondary' onClick={this.toggleDescriptionModal}>
							<Icon fa-file-text-o />
						</Button>
					}
					<Button color='primary' onClick={this.addToObjectives}>
						<Icon fa-handshake-o tooltip='Add to my objectives' id={`add-to-objectives-${index}`} />
					</Button>
				</Col>
				{ hasDescription && 
					<DescriptionModal show={this.state.descriptionModal} 
						toggle={this.toggleDescriptionModal} 
						description={task.description}
						title='Task description' />
				}
			</li>
		)
	}
}

const mapDispatchToProps = dispatch => {
	return {
		createObjectiveFromTask : (task) => dispatch(createObjectiveFromTask(task))
	}
}

export default withRouter(connect(null, mapDispatchToProps)(TasksListItem));