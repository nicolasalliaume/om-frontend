import React, { Component } from 'react';
import IntegrationInstructionsModal from './IntegrationInstructionsModal';

export default class IntegrationInstructionsTeamworkModal extends Component {
	render() {
		const { integration } = this.props;
		return (
			<IntegrationInstructionsModal {...this.props}>
				<p>
					We use a custom integration to connect with Teamwork that allow us to create tasks 
					immediately when a new task has been added on a Teamwork team.<br/>
					For this, we use Webhooks.
				</p>
				<p><i>Note: Webhooks are available only for paid plans on Teamwork</i></p>
				<hr/>
				<p>
					To setup this integrations, log into your Teamwork account and&nbsp;
					<a href='https://developer.teamwork.com/settingupwebhooks' target='_blank' rel='nooptions nofollow'>create a webhook</a>&nbsp;
					with the following information
				</p>
				<p><b>Webhook event:</b> TASK.CREATED</p>
				<p><b>Endpoint URL:</b> https://om-integrations.herokuapp.com/teamwork/webhook/{integration._id}</p>
				<p><b>Content Type:</b> JSON</p>
				<hr/>
				<p>
					This integration also needs to map the project ids used on Teamwork to OM ids.<br/>
					Edit this integration to add those mappings under <i>Mappings</i>.
				</p>
			</IntegrationInstructionsModal>
		)
	}
}