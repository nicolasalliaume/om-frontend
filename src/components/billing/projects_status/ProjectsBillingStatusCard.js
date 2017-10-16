import React, { Component } from 'react';
import { Card, CardTitle, CardBlock } from 'reactstrap';
import ProjectsBillingStatusList from './ProjectsBillingStatusList';

export default class ProjectsBillingStatusCard extends Component {
	render() {
		const { title, project } = this.props;
		return (
			<Card className='projects-status list list--large'>
				<CardBlock className='card-body'>
					{ title && <CardTitle dangerouslySetInnerHTML={{__html: title}}></CardTitle> }
					{ !title && <CardTitle>Projects <b>status</b></CardTitle> }
					<ProjectsBillingStatusList filter={project} />
				</CardBlock>
			</Card>
		)
	}
}