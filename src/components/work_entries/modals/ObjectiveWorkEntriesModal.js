import React, { Component } from 'react';
import { connect } from 'react-redux';	
import { 
	fetchObjectiveWorkEntries, 
	createObjectiveWorkEntry,
	invalidateObjectiveWorkEntries
} from '../../../actions/objectives';
import { 
	Modal, 
	ModalHeader, 
	ModalBody,
	ModalFooter,
	Button
} from 'reactstrap';
import WorkEntriesGridListNewItem from './WorkEntriesGridListNewItem';
import WorkEntriesGridList from '../view/WorkEntriesGridList';

class ObjectiveWorkEntriesModal extends Component {
	constructor() {
		super();
		this.state = { showNew: false }
	}

	componentWillMount() {
		this.props.fetchWorkEntriesForObjective(this.props.objective._id);
	}

	componentWillReceiveProps(props) {
		// reload if opening modal
		if (props.show && !this.props.show) {
			this.props.fetchWorkEntriesForObjective(this.props.objective._id);
		}
		else {
			// reloading if new entry was added
			const workEntries = props.workEntriesByObjectiveId[this.props.objective._id];
			if (workEntries.didInvalidate && !workEntries.isFetching) {
				this.props.fetchWorkEntriesForObjective(this.props.objective._id);
			}
		}
	}

	showAddNewEntry = () => this.setState({ showNew: true })

	addNewEntry = (hours) => {
		const time = hours * 3600;
		this.props.createObjectiveWorkEntry(this.props.objective._id, { time });
		this.setState({ showNew: false});
	}

	render() {
		const { objective, workEntriesByObjectiveId } = this.props;
		if (!workEntriesByObjectiveId[objective._id]) return <span />;

		const { toggle, show } = this.props;
		const entries = workEntriesByObjectiveId[objective._id].entries;
		return (
			<Modal isOpen={show} toggle={toggle} className='work-entries'>
				<ModalHeader toggle={toggle}>Objective's <b>work entries</b></ModalHeader>
				<ModalBody>
					{ this.state.showNew && 
						<WorkEntriesGridListNewItem submit={this.addNewEntry} /> 
					}
					<WorkEntriesGridList entries={entries || []} />
				</ModalBody>
				<ModalFooter>
					<Button color="secondary" onClick={this.showAddNewEntry}>+ add new</Button>{' '}
				</ModalFooter>
			</Modal>
		)
	}
}

const mapDispatchToProps = dispatch => { return {
    fetchWorkEntriesForObjective : (objectiveId) => dispatch(fetchObjectiveWorkEntries(objectiveId)),
    createObjectiveWorkEntry : (objectiveId, entry) => dispatch(createObjectiveWorkEntry(objectiveId, entry)),
}}

const mapStateToProps = state => { return {
    workEntriesByObjectiveId : state.work_entries
}}

export default connect(mapStateToProps, mapDispatchToProps)(ObjectiveWorkEntriesModal);
