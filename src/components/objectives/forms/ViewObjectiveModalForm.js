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
import { fetchSingleObjective } from '../../../actions/objectives';
import HtmlDescription from '../../misc/HtmlDescription';


class ViewObjectiveModalForm extends Component {
	componentWillMount() {
		this.props.fetchSingleObjective(this.props.objectiveId);
	}
	componentWillReceiveProps(props) {
		if (!props.modalObjective.objective) {
			this.props.fetchSingleObjective(this.props.objectiveId);
		}
	}
	render() {
		const { modalObjective, toggle, show, className } = this.props;
		const objective = modalObjective.objective;
		if (!objective) return <div></div>;

		const hasDescription = objective.related_task && objective.related_task.description;
		const isHTML = hasDescription && objective.related_task.origin === 'email';

		const clazz = (className || '') + ' ' + (isHTML ? 'html' : '');

		return (
			<Modal isOpen={show} toggle={toggle} className={clazz}>
				<ModalHeader toggle={toggle}>{objective.title}</ModalHeader>
				<ModalBody>
					<Row>
						<Label sm={3}>Date</Label>
						<Col sm={9}>
							{ objective.level === 'day' && moment(objective.date).format('MM/DD/YYYY') }
							{ objective.level === 'month' && moment(objective.date).format('MM/YYYY') }
							{ objective.level === 'year' && moment(objective.date).format('YYYY') }
						</Col>
					</Row>
					<Row>
						<Label sm={3}>Owners</Label>
						<Col xs={9}>
							{ objective.owners.map(u => <Tag key={u.id} className='owner'>{u.full_name}</Tag>) }
						</Col>
					</Row>
					{ hasDescription && (
						<Row>
							<Col xs={12}><Label>Description:</Label></Col>
							<Col xs={12}>
								{ isHTML && <HtmlDescription description={objective.related_task.description} /> }
								{ !isHTML && <p>{ objective.related_task.description }</p> }
							</Col>
						</Row>
					) }
				</ModalBody>
				{ /* <ModalFooter>
					<Button color="secondary" onClick={this.edit.bind(this)}>Edit</Button>
				</ModalFooter> */ }
			</Modal>
		)
	}
	edit() {

	}
}

const mapDispatchToProps = dispatch => { return {
    fetchSingleObjective : (oid) => dispatch(fetchSingleObjective(oid))
}}

const mapStateToProps = state => ({
	modalObjective: state.cache.modalObjective,
})

export default connect(mapStateToProps, mapDispatchToProps)(ViewObjectiveModalForm);
