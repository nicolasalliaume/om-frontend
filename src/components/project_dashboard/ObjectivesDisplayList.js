import React, { Component } from 'react';
import { Col, Card, CardBody, CardTitle } from 'reactstrap';
import { Link, withRouter } from 'react-router-dom';
import Tag from '../misc/Tag';
import ObjectivesDisplayListFilterBar from './ObjectivesDisplayListFilterBar';

class ObjectivesDisplayList extends Component {
	componentDidMount() {
		this.props.fetch();
	}

	submitFilters = (filters) => {
		// assuming here we're only filtering by task properties
		this.props.fetch({
			related_task: filters
		});
	}

	render() {
		const { title, dataSource } = this.props;
		return (
			<Card className={`list objectives display`}>
				<CardBody >
					<CardTitle dangerouslySetInnerHTML={{__html: title}} />
					<ObjectivesDisplayListFilterBar submit={this.submitFilters} />
					{ !dataSource.empty() && 
						<ul className={`objectives-list`}>
							{ dataSource.map((o) => this.renderObjective(o)) }
						</ul>
					}
					{ dataSource.empty() && 
						<p className='text-center'>No objectives to show</p>
					}
				</CardBody>
			</Card>
		)
	}

	renderObjective(o) {
		const { 
			deleted, 
			progress, 
			scratched, 
			completed_by, 
			scratched_by,
			deleted_by 
		} = o;
		const completed = progress === 1;
		return (
			<li key={o._id} className={`objective display row`}>
				<Col xs={12}>
					<Link to={`${this.props.location.pathname}/objective/${o._id}`}>
						<h4>{o.related_task.title}</h4>
					</Link>
					<div className='owners'>
						{ o.owners.map(owner => 
							<Tag key={owner._id} className='owner'>
								{owner.full_name}
							</Tag>
						)}
					</div>
					<div className='status'>
						{ completed && `Completed by ${completed_by.full_name}` }
						{ scratched && `Scratched by ${scratched_by.full_name}` }
						{ deleted && `Deleted by ${deleted_by.full_name}` }
					</div>
				</Col>
			</li>
		)
	}
}

export default withRouter(ObjectivesDisplayList)