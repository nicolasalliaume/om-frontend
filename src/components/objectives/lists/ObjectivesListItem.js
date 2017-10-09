import React, { Component } from 'react';
import { Row, Col, Button } from 'reactstrap';
import Icon from './../../misc/Icon';
import ExternalUrlLink from './../../misc/ExternalUrlLink';
import EditObjectiveModalForm from './../forms/EditObjectiveModalForm';
import DescriptionModal from './../../misc/DescriptionModal';
import AttachmentsModal from './../../misc/AttachmentsModal';
import ObjectiveWorkEntriesModal from './../../work_entries/modals/ObjectiveWorkEntriesModal';
import { confirmAlert } from './../../misc/ConfirmDialog';
import Strings from '../../../strings/dialogs';
import { 
	scratchObjective,
	unscratchObjective,
	completeObjective,
	deleteObjective 
} from './../../../actions/objectives';
import { connect } from 'react-redux';
import Tag from '../../misc/Tag';
import moment from 'moment';

class ObjectivesListItem extends Component {
	constructor() {
		super();
		this.state = { 
			editModal: false, 
			descriptionModal: false,
			attachmentsModal: false,
			workEntriesModal: false
		}
	}

	toggleEditModal = () => this.toggleStateProp('editModal')
	toggleDescriptionModal = () => this.toggleStateProp('descriptionModal')
	toggleAttachmentsModal = () => this.toggleStateProp('attachmentsModal')
	toggleWorkEntriesModal = () => this.toggleStateProp('workEntriesModal')
	toggleStateProp = (prop) => this.setState({ [prop] : !this.state[prop] })

	confirmScratchObjective = () => {
		confirmAlert({
			title : 'Scratch objective',
			message : Strings.SCRATCH_OBJECTIVE,
			confirmLabel : 'scratch',
			cancelLabel : 'cancel',
			onConfirm : this.scratchObjective
		})
	}

	confirmDeleteObjective = () => {
		confirmAlert({
			title : 'Delete objective',
			message : Strings.DELETE_OBJECTIVE,
			confirmLabel : 'delete',
			cancelLabel : 'cancel',
			onConfirm : this.deleteObjective
		})
	}

	scratchObjective = () => this.props.scratchObjective(this.props.objective._id)
	unscratchObjective = () => this.props.unscratchObjective(this.props.objective._id)
	completeObjective = () => this.props.completeObjective(this.props.objective._id)
	deleteObjective = () => this.props.deleteObjective(this.props.objective._id)

	isMigrated = () => {
		const { objective } = this.props;
		const compareFormat = this.getIsMigratedDateFormat(objective.level);
		return moment.utc(objective.objective_date).format(compareFormat) 
				!== moment.utc().format(compareFormat);
	}

	getMigratedFormattedDate = () => {
		const { objective } = this.props;
		const level = objective.level;
		let date = moment.utc(objective.objective_date).startOf(level).startOf('day');
		let today = moment.utc().startOf(level).startOf('day');
		const diff = Math.ceil(today.diff(date, level + 's', true));
		const unit = diff > 1 ? level + 's' : level;
		return diff + ' ' + unit;
	}

	getIsMigratedDateFormat = (level) => {
		return level === 'day' ? "YYYY/MM/DD" : (level === 'month' ? 'YYYY/MM' : 'YYYY');
	}

	render() {
		const { objective, index } = this.props;
		const { scratched, progress, related_task } = objective;
		const uid = objective._id;
		const completed = progress === 1;
		const taskBased = !!related_task;
		const hasDescription = related_task && !!related_task.description;
		const hasAttachments = related_task && related_task.attachments 
				&& related_task.attachments.length > 0;

		let additionalClasess = (scratched ? ' scratched line-through' : '')
							  + (completed ? ' completed' : '');
		return (
			<li className={`objective list-item ${additionalClasess}`}>
				<Row>

					<Col xs={1}>
						<p className='list-number'>
							{ !completed && (index+1) }
							{ completed && <Icon fa-check /> }
						</p>
					</Col>

					<Col xs={11}>
						<h4 className='objective-title'>
							{ taskBased && <b>{related_task.project.name}</b> }
							{ taskBased && ':  ' }
							{objective.title}
						</h4>
						{ this.isMigrated() && 
							<Tag className='migrated'>
								Migrated{' '}<span className='date'>{this.getMigratedFormattedDate()}</span>
							</Tag>
						}
						{ taskBased && related_task.tags.length > 0 &&
							related_task.tags.map((t,i) => <Tag key={i}>{t}</Tag>)
						}
					</Col>

					<Col xs={12} className='text-right list-item-options'>
						{ taskBased && related_task.external_url &&
							<ExternalUrlLink url={related_task.external_url} tooltip='Open original task' 
								id={`task-external-link-${index}`} />
						}
						{ completed && !hasDescription && 
							<span>&nbsp;</span> 
						}
						{ hasDescription &&
							<Button color='secondary' onClick={this.toggleDescriptionModal}>
								<Icon fa-file-text-o tooltip="View description" id={`description-${uid}`} />
							</Button>
						}
						{ hasAttachments && 
							<Button color='secondary' onClick={this.toggleAttachmentsModal}>
								<Icon fa-paperclip tooltip="View attachments" 
									id={`view-attachments-${uid}`} />
							</Button>
						}
						<Button color='secondary' onClick={this.toggleWorkEntriesModal}>
							<Icon fa-th-list tooltip="View work entries" 
								id={`view-work-entries-${uid}`} />
						</Button>
						{ !objective.scratched && !completed && 
							<Button color='secondary' onClick={this.completeObjective}>
								<Icon fa-check tooltip="Set completed" id={`set-completed-${uid}`} />
							</Button>
						}
						{ !objective.scratched && !completed && 
							<Button color='secondary' onClick={this.toggleEditModal}>
								<Icon fa-pencil tooltip="Edit" id={`edit-${uid}`}/>
							</Button>
						}
						{ !objective.scratched && !completed && 
							<Button color='secondary' onClick={this.confirmScratchObjective}>
								<Icon fa-minus-square-o tooltip="Scratch" id={`scratch-${uid}`} />
							</Button>
						}
						{ objective.scratched && !completed && 
							<Button color='secondary' onClick={this.unscratchObjective}>
								<Icon fa-undo tooltip="Un-scratch" id={`unscratch-${uid}`} />
							</Button>
						}
						{ !objective.scratched && !completed && 
							<Button color='secondary' onClick={this.confirmDeleteObjective}>
								<Icon fa-remove tooltip="Delete objective" id={`delete-${uid}`} />
							</Button>
						}
					</Col>
				</Row>

				<EditObjectiveModalForm edit show={this.state.editModal} 
					toggle={this.toggleEditModal} objective={objective} />

				<ObjectiveWorkEntriesModal show={this.state.workEntriesModal}
					toggle={this.toggleWorkEntriesModal} objective={objective} />

				{ hasDescription && 
					<DescriptionModal show={this.state.descriptionModal} 
						toggle={this.toggleDescriptionModal} 
						description={related_task.description}
						isHTML={related_task.origin === 'email'}
						title='Task description' />
				}
				{ hasAttachments && 
					<AttachmentsModal show={this.state.attachmentsModal}
						title={<span>Task <b>attachments</b></span>}
						toggle={this.toggleAttachmentsModal}
						files={related_task.attachments} />
				}
			</li>
		)
	}
}

const mapDispatchToProps = (dispatch) => { return {
	scratchObjective 	: (oid) => dispatch(scratchObjective(oid)),
	unscratchObjective  : (oid) => dispatch(unscratchObjective(oid)),
	completeObjective	: (oid) => dispatch(completeObjective(oid)),
	deleteObjective 	: (oid) => dispatch(deleteObjective(oid))
}}

export default connect(null, mapDispatchToProps)(ObjectivesListItem);
