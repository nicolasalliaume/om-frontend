import React, { Component } from 'react';
import { Col, Card, CardBody, CardTitle, Button } from 'reactstrap';
import EditIntegrationModalForm from '../forms/EditIntegrationModalForm';
import IntegrationInstructionsTeamworkModal from './../misc/IntegrationInstructionsTeamworkModal';
import IntegrationInstructionsTrelloModal from './../misc/IntegrationInstructionsTrelloModal';

export default class IntegrationCard extends Component {
	constructor() {
		super();
		this.state = { modal : false, instructionsModal : false };
	}
	toggleModal = () => this.toggleState('modal');
	toggleInstructionsModal = () => this.toggleState('instructionsModal');
	toggleState = (name) => this.setState({ [name] : !this.state[name] })
	render() {
		const { integration } = this.props;
		const { service } = integration;
		return (
			<Col lg={3} md={4} sm={6} xs={6}>
				<Card className={`integration-card ${integration.service}`}>
					<CardBody >
						<CardTitle>{integration.name}</CardTitle>
						<div className='integration-service text-center'>
							<span>{service}</span>
						</div>
						<div className='author'>{integration.created_by.full_name}</div>
						<div className='text-center'>
							<Button className='view-details' onClick={this.toggleModal}>
								View details
							</Button>
							{ (service === 'trello' || service === 'teamwork') && 
								<Button className='view-instructions' onClick={this.toggleInstructionsModal}>
									Instructions
								</Button>
							}
						</div>
						<div className='id text-center'>ID: {integration._id}</div>
					</CardBody>
				</Card>
				
				<EditIntegrationModalForm edit show={this.state.modal} 
					toggle={this.toggleModal} integration={integration} />

				{ integration.service === 'trello' && 
					<IntegrationInstructionsTrelloModal show={this.state.instructionsModal}
						toggle={this.toggleInstructionsModal} integration={integration} />
				}
				{ integration.service === 'teamwork' && 
					<IntegrationInstructionsTeamworkModal show={this.state.instructionsModal}
						toggle={this.toggleInstructionsModal} integration={integration} />
				}

			</Col>
		)
	}
}