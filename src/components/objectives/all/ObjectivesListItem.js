import React, { Component } from 'react';
import { Row, Col, Button } from 'reactstrap';
import Icon from './../../misc/Icon';
import EditObjectiveModalForm from './../forms/EditObjectiveModalForm';
import DescriptionModal from './../../misc/DescriptionModal';
import { confirmAlert } from './../../misc/ConfirmDialog';
import Strings from '../../../strings/dialogs';
import { scratchObjective, unscratchObjective, completeObjective } from './../../../actions/objectives';
import { connect } from 'react-redux';

class ObjectivesListItem extends Component {
	constructor() {
		super();
		this.state = { editModal : false, descriptionModal : false }
	}
	toggleEditModal = () => {
		this.toggleStateProp('editModal');
	}
	toggleDescriptionModal = () => {
		this.toggleStateProp('descriptionModal');
	}
	toggleStateProp = (prop) => {
		this.setState({ [prop] : !this.state[prop] })
	}
	confirmScratchObjective = () => {
		confirmAlert({
			title : 'Scratch objective',
			message : Strings.SCRATCH_OBJECTIVE,
			confirmLabel : 'scratch',
			cancelLabel : 'cancel',
			onConfirm : this.scratchObjective
		})
	}
	scratchObjective = () => {
		this.props.scratchObjective(this.props.objective._id);
	}
	unscratchObjective = () => {
		this.props.unscratchObjective(this.props.objective._id);
	}
	completeObjective = () => {
		this.props.completeObjective(this.props.objective._id);
	}
	render() {
		const { objective, index } = this.props;
		const description = objective.related_task ? objective.related_task.description : null;
		const title = objective.title.capitalizeFirst();
		const { scratched, progress, related_task } = objective;
		const completed = objective.progress === 1;
		const hasDescription = related_task && !!related_task.description;
		let additionalClasess = (scratched ? ' scratched line-through' : '')
							  + (completed ? ' completed' : '');
		return (
			<li className={`objective list-item ${additionalClasess}`}>
				<Row>
					<Col xs={1}>
						<p className='list-number'>
							{ !completed && (index+1) }
							{ completed && <Icon fa-check done-color /> }
						</p>
					</Col>
					<Col xs={11}>
						<h4 className='objective-title'>{objective.title}</h4>
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
	completeObjective	: (oid) => dispatch(completeObjective(oid))
}}

export default connect(null, mapDispatchToProps)(ObjectivesListItem);
