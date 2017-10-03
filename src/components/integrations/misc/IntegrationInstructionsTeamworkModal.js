import React, { Component } from 'react';
import IntegrationInstructionsModal from './IntegrationInstructionsModal';

export default class IntegrationInstructionsTeamworkModal extends Component {
	render() {
		const { integration } = this.props;
		return (
			<IntegrationInstructionsModal {...this.props}>
				<p>For now we'll be using IFTTT to integrate OM with Trello.<br/>
				IFTTT is a free integrations tool that integrates hundreds of services through REST APIs.</p>
				<hr/>
				<p>To setup this integrations, log into your IFTTT account and create an applet with the following information</p>
				<p><b>Trigger:</b> Trello : Card added to board</p>
				<p><b>Action:</b> Wehbook : Make a web request</p>
				<p><b>Request options:</b></p>
				<pre>
					URL: https://om-integrations.herokuapp.com/trello/cardcreated/{integration._id}
					Method: POST
					Content Type: application/json
					Body:
						{'{"title":"{{Title}}", "description":" {{Description}}", "list": " {{ListName}}", "board":" {{BoardName}}","creator":"{{CreatorUsername}}","cardUrl":"{{CardURL}}"}'}
				</pre>
			</IntegrationInstructionsModal>
		)
	}
}