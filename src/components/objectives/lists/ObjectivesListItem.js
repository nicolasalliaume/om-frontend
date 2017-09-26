import React, { Component } from 'react';
import { Row, Col, Button } from 'reactstrap';
import Icon from './../../misc/Icon';
import EditObjectiveModalForm from './../forms/EditObjectiveModalForm';
import DescriptionModal from './../../misc/DescriptionModal';
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
		this.state = { editModal : false, descriptionModal : false }
	}

	toggleEditModal = () => this.toggleStateProp('editModal')
	toggleDescriptionModal = () => this.toggleStateProp('descriptionModal')
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
		const completed = progress === 1;
		const hasDescription = related_task && !!related_task.description;

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
						<h4 className='objective-title'>{objective.title}</h4>
						{ this.isMigrated() && 
							<Tag className='migrated'>
								Migrated{' '}<span className='date'>{this.getMigratedFormattedDate()}</span>
							</Tag>
						}
					</Col>
					<Col xs={12} className='text-right list-item-bottom-options'>
						{ completed && !hasDescription && 
							<span>&nbsp;</span> 
						}
						{ hasDescription &&
							<Button color='secondary' onClick={this.toggleDescriptionModal}>
								<Icon fa-file-text-o />
							</Button>
						}
						{ !objective.scratched && !completed && 
							<Button color='secondary' onClick={this.completeObjective}>
								<Icon fa-check />
							</Button>
						}
						{ !objective.scratched && !completed && 
							<Button color='secondary' onClick={this.toggleEditModal}>
								<Icon fa-pencil />
							</Button>
						}
						{ !objective.scratched && !completed && 
							<Button color='secondary' onClick={this.confirmScratchObjective}>
								<Icon fa-minus-square-o />
							</Button>
						}
						{ objective.scratched && !completed && 
							<Button color='secondary' onClick={this.unscratchObjective}>
								<Icon fa-undo />
							</Button>
						}
						{ !objective.scratched && !completed && 
							<Button color='secondary' onClick={this.deleteObjective}>
								<Icon fa-remove />
							</Button>
						}
					</Col>
				</Row>
				<EditObjectiveModalForm edit show={this.state.editModal} 
					toggle={this.toggleEditModal} objective={objective} />

				{ hasDescription && 
					<DescriptionModal show={this.state.descriptionModal} 
						toggle={this.toggleDescriptionModal} 
						description={related_task.description}
						title='Task description' />
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
