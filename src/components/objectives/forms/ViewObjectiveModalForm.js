import React, { Component } from 'react';
import { connect } from 'react-redux';	
import moment from 'moment';
import { 
	Button, 
	Modal, 
	ModalHeader, 
	ModalBody, 
	ModalFooter,
	Label,
	Row,
	Col,
} from 'reactstrap';
import Tag from '../../misc/Tag';
import { fetchSingleObjective, updateObjective } from '../../../actions/objectives';
import HtmlDescription from '../../misc/HtmlDescription';


class ViewObjectiveModalForm extends Component {
	componentWillMount() {
		this.props.fetchSingleObjective(this.props.objectiveId);
	}
	
	componentWillReceiveProps(props) {
		console.log("componentWillReceiveProps()");
		console.log(props.objectiveId, props.modalObjective.isFetching, props.modalObjective.objective);
		if (!props.modalObjective.objective && !props.modalObjective.isFetching) {
			console.log("componentWillReceiveProps() fetching");
			props.fetchSingleObjective(props.objectiveId);
		}
	}

	reopen() {
		const update = { 
			progress: 0,
			completed_by: null,
			completed_ts: null,	
		}
		this.props.updateObjective(this.props.objectiveId, update);
	}

	render() {
		const { modalObjective, toggle, show, className } = this.props;
		const objective = modalObjective.objective;
		if (!objective) return <div></div>;

		const hasDescription = objective.related_task && objective.related_task.description;
		const isHTML = hasDescription && objective.related_task.origin === 'email';

		const clazz = (className || '') + ' view-objective ' + (isHTML ? 'html' : '');

		return (
			<Modal isOpen={show} toggle={toggle} className={clazz}>
				<ModalHeader toggle={toggle}>{objective.title}</ModalHeader>
				<ModalBody>
					<Row>
						<Label sm={2}>Date</Label>
						<Label sm={10}>
							{ objective.level === 'day' && moment(objective.date).format('MM/DD/YYYY') }
							{ objective.level === 'month' && moment(objective.date).format('MM/YYYY') }
							{ objective.level === 'year' && moment(objective.date).format('YYYY') }
						</Label>
					</Row>
					<Row>
						<Label sm={2}>Owners</Label>
						<Label sm={10}>
							{ objective.owners.map(u => <Tag key={u.id} className='owner'>{u.full_name}</Tag>) }
						</Label>
					</Row>
					<Row>
						<Label sm={2}>Status</Label>
						<Label sm={3}>
							{ objective.progress === 1 && <Tag className='status completed'>Completed</Tag> }
							{ objective.progress !== 1 && <Tag className='status active'>Active</Tag> }
						</Label>
					</Row>
					{ hasDescription && (
						<Row>
							<Label sm={12}>Description:</Label>
							<Col xs={12}>
								{ isHTML && <HtmlDescription description={objective.related_task.description} /> }
								{ !isHTML && <p>{ objective.related_task.description }</p> }
							</Col>
						</Row>
					) }
				</ModalBody>
				{ /* if completed, show option to re-open (un-complete) */ }
				{ objective.progress === 1 && 
					<ModalFooter>
						<Button color='primary' onClick={this.reopen.bind(this)} className='bordered'>Reopen</Button>
					</ModalFooter>
				}
			</Modal>
		)
	}
}

const mapDispatchToProps = dispatch => { return {
    fetchSingleObjective : (oid) => dispatch(fetchSingleObjective(oid)),
	updateObjective : (oid, update) => dispatch(updateObjective(oid, update)),
}}

const mapStateToProps = state => ({
	modalObjective: state.cache.modalObjective,
	cache: state.cache,
})

export default connect(mapStateToProps, mapDispatchToProps)(ViewObjectiveModalForm);
