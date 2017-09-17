import React, { Component } from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { connect } from 'react-redux';
import { fetchTasksListPageIfNeeded, moveToPage } from './../../../actions/tasks';
import TasksList from './TasksList';
import { getPaginationBarFirstAndLastVisiblePages } from '../../../utils';

class PaginatedTasksList extends Component {
	componentDidMount() {
		this.fetchTasksForPage(this.props.visiblePage);
	}
	componentWillReceiveProps(props) {
		this.fetchTasksForPage(props.visiblePage);
	}
	fetchTasksForPage(page) {
		this.props.fetchTasksListPageIfNeeded(page);
	}

	moveBack = () => this.props.moveToPage(this.props.visiblePage - 1);
	moveNext = () => this.props.moveToPage(this.props.visiblePage + 1);
	moveToPage(page) {
		this.props.moveToPage(page);
	}
	
	getPaginationBar = (visiblePage, totalPages) => {
		const [first, last] = getPaginationBarFirstAndLastVisiblePages(visiblePage, totalPages);
		const pages = [];
		for (let p = first; p <= last; p++) {
			pages.push(
				<PaginationItem key={p} active={ p === visiblePage }>
					<PaginationLink onClick={() => this.moveToPage(p)}>{p}</PaginationLink>
				</PaginationItem>
			);
		}
		return pages;
	}
	render() {
		const { tasks, visiblePage, count, totalPages, pageSize } = this.props;
		const firstListIndex = (visiblePage-1) * pageSize;
		console.log('rendering page %d', visiblePage)
		return (
			<div className='paginated-tasks-list'>
				<TasksList tasks={tasks} indexStart={firstListIndex} />
				<Pagination className='row'>
					<PaginationItem>
						<PaginationLink previous onClick={this.moveBack} />
					</PaginationItem>
					{ this.getPaginationBar(visiblePage, totalPages) }
					<PaginationItem>
						<PaginationLink next onClick={this.moveNext} />
					</PaginationItem>
				</Pagination>
				{ tasks && <p>Showing {tasks.length} of {count}</p> }
			</div>
		)
	}
}

const mapStateToProps = state => {
	const tasksView = state.tasksView;
	const { tasksByPage } = state.tasksView.tasksList;
	const { visiblePage } = state.tasksView;
	const { total_pages, count, page_size } = state.tasksView.tasksList.cursor;
	return {
		visiblePage,
		count,
		tasks 	   : tasksByPage[visiblePage],
		totalPages : total_pages,
		pageSize   : page_size
  	}
}

const mapDispatchToProps = dispatch => { return {
	fetchTasksListPageIfNeeded 	: (page) => dispatch(fetchTasksListPageIfNeeded(page)),
	moveToPage : (page) => dispatch(moveToPage(page))
}}

export default connect(mapStateToProps, mapDispatchToProps)(PaginatedTasksList);
