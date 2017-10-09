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
import ExternalUrlLink from './../../misc/ExternalUrlLink';
import AttachmentsModal from './../../misc/AttachmentsModal';

class TasksListItem extends Component {
	constructor() {
		super();
		this.state = { 
			descriptionModal: false, 
			editModal: false, 
			attachmentsModal: false 
		}
	}
	
	toggleDescriptionModal = () => this.toggleModal('descriptionModal')
	toggleEditModal = () => this.toggleModal('editModal')
	toggleAttachmentsModal = () => this.toggleModal('attachmentsModal');
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
		const uid = task._id;
		const hasDescription = !!task.description;
		const hasAttachments = task.attachments && task.attachments.length > 0;
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
					{ task.description && task.origin !== 'email' && 
						<p>{task.description.trimToWords(400)}</p> 
					}
					{ task.description && task.origin === 'email' && 
						<p><i>HTML description hidden. Tap on <Icon fa-file-text-o/> to see</i></p> 
					}
					{ task.tags.length > 0 && 
						<div className="tags">
							{ task.tags.map((t,i) => <Tag key={i}>{t}</Tag>) }
						</div>
					}
				</Col>
				<Col xs={12} className='text-right list-item-options'>
					{ task.external_url && 
						<ExternalUrlLink url={task.external_url} tooltip='Open original task' 
							id={`task-external-link-${uid}`} />
					}
					{ hasDescription &&
						<Button color='secondary' onClick={this.toggleDescriptionModal}>
							<Icon fa-file-text-o tooltip="View description" id={`description-${uid}`} />
						</Button>
					}
					{ hasAttachments && 
						<Button color='secondary' onClick={this.toggleAttachmentsModal}>
							<Icon fa-paperclip tooltip="View attachments" id={`view-attachments-${uid}`} />
						</Button>
					}
					<Button color='primary' onClick={this.toggleEditModal}>
						<Icon fa-edit tooltip="Edit" id={`edit-${uid}`} />
					</Button>
					<Button color='primary' onClick={this.confirmDelete}>
						<Icon fa-remove tooltip="Delete" id={`delete-${uid}`} />
					</Button>
					<Button color='primary' onClick={this.addToObjectives}>
						<Icon fa-handshake-o tooltip='Add to my objectives' id={`add-to-objectives-${uid}`} />
					</Button>
				</Col>
				{ hasDescription && 
					<DescriptionModal show={this.state.descriptionModal} 
						toggle={this.toggleDescriptionModal} 
						description={task.description}
						title='Task description'
						isHTML={task.origin === 'email'} />
				}
				{ hasAttachments && 
					<AttachmentsModal show={this.state.attachmentsModal}
						title={<span>Email <b>attachments</b></span>}
						toggle={this.toggleAttachmentsModal}
						files={task.attachments} />
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