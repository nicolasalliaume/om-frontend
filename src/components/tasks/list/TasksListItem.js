import React, { Component } from 'react';
import { Col, Button } from 'reactstrap';
import { connect } from 'react-redux';
import { createObjectiveFromTask } from './../../../actions/objectives';
import { deleteTask } from './../../../actions/tasks';
import { withRouter } from 'react-router-dom';
import Icon from './../../misc/Icon';
import DescriptionModal from './../../misc/DescriptionModal';
import EditTaskModalForm from '../forms/EditTaskModalForm';
import { confirmAlert } from './../../misc/ConfirmDialog';
import Strings from '../../../strings/dialogs';
import TaskReview from '../misc/TaskReview';
import Tag from '../../misc/Tag';

class TasksListItem extends Component {
	constructor() {
		super();
		this.state = { descriptionModal: false, editModal : false }
	}
	
	toggleDescriptionModal = () => this.toggleModal('descriptionModal')
	toggleEditModal = () => this.toggleModal('editModal')
	toggleModal = (modal) => this.setState({ [modal] : !this.state[modal] })
	
	addToObjectives = () => {
		const { task, createObjectiveFromTask } = this.props;
		createObjectiveFromTask(task);
		this.navigateToDashboard();
	}
	navigateToDashboard() {
		this.props.history.push('/');
	}
	confirmDelete = () => {
		confirmAlert({
			title : 'Remove task',
			message : Strings.DELETE_TASK,
			confirmLabel : 'delete',
			cancelLabel : 'cancel',
			onConfirm : this.deleteTask,
			childrenElement : <TaskReview task={this.props.task} />
		})
	}
	deleteTask = () => this.props.deleteTask(this.props.task._id)

	render() {
		const { task, index } = this.props;
		const hasDescription = !!task.description;
		return (
			<li className='tasks-list-item row'>
				<Col xs={1}>
					<p className={`list-number ${index>=99 ? 'hundreds' : ''}`}>{index + 1}</p>
				</Col>
				<Col xs={11}>
					<h4>
						<b>{task.project.name}</b>{':  '}
						{ task.origin !== 'web' && <Tag className='origin'>{task.origin}</Tag> }
						{task.title}
					</h4>
					{ task.description && <p>{task.description.trimToWords(400)}</p> }
					{ task.tags.length > 0 && 
						<div className="tags">
							{ task.tags.map((t,i) => <Tag key={i}>{t}</Tag>) }
						</div>
					}
				</Col>
				<Col xs={12} className='text-right list-item-bottom-options'>
					{ task.external_url && 
						<a href={task.external_url} target='_blank' rel='nofollow noopener' className='btn btn-secondary'>
							<Icon fa-external-link tooltip='Open original task' id={`task-external-link-${index}`} />
						</a>
					}
					{ hasDescription &&
						<Button color='secondary' onClick={this.toggleDescriptionModal}>
							<Icon fa-file-text-o />
						</Button>
					}
					<Button color='primary' onClick={this.toggleEditModal}>
						<Icon fa-edit />
					</Button>
					<Button color='primary' onClick={this.confirmDelete}>
						<Icon fa-remove />
					</Button>
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
				<EditTaskModalForm task={task} show={this.state.editModal} 
					toggle={this.toggleEditModal} />
			</li>
		)
	}
}

const mapDispatchToProps = dispatch => {
	return {
		createObjectiveFromTask : (task) => dispatch(createObjectiveFromTask(task)),
		deleteTask : (taskId) => dispatch(deleteTask(taskId))
	}
}

export default withRouter(connect(null, mapDispatchToProps)(TasksListItem));