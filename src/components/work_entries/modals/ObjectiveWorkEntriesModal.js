import React, { Component } from 'react';
import { connect } from 'react-redux';	
import { fetchObjectiveWorkEntries } from '../../../actions/objectives';
import { 
	Modal, 
	ModalHeader, 
	ModalBody
} from 'reactstrap';
import WorkEntriesList from '../view/WorkEntriesList';

class ObjectiveWorkEntriesModal extends Component {
	componentWillReceiveProps(props) {
		if (props.show && !this.props.show)
			this.props.fetchWorkEntriesForObjective(this.props.objective._id);
	}
	render() {
		const { objective, workEntriesByObjectiveId } = this.props;
		const { toggle, show } = this.props;
		const entries = workEntriesByObjectiveId[objective._id];
		return (
			<Modal isOpen={show} toggle={toggle} className='work-entries'>
				<ModalHeader toggle={toggle}>Objective's <b>work entries</b></ModalHeader>
				<ModalBody>
					<WorkEntriesList entries={entries || []} />
				</ModalBody>
			</Modal>
		)
	}
}

const mapDispatchToProps = dispatch => { return {
    fetchWorkEntriesForObjective : (objectiveId) => dispatch(fetchObjectiveWorkEntries(objectiveId))
}}

const mapStateToProps = state => { return {
    workEntriesByObjectiveId : state.work_entries
}}

export default connect(mapStateToProps, mapDispatchToProps)(ObjectiveWorkEntriesModal);
