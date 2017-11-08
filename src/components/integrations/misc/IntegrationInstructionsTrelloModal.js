import React, { Component } from 'react';
import IntegrationInstructionsModal from './IntegrationInstructionsModal';

export default class IntegrationInstructionsTrelloModal extends Component {
	render() {
		const { integration } = this.props;
		return (
			<IntegrationInstructionsModal {...this.props}>
				<p>For now we'll be using IFTTT to integrate OM with Trello.<br/>
				IFTTT is a free integrations tool that integrates hundreds of services through REST APIs.</p>
				<hr/>
				<p>
					To setup this integrations, log into your IFTTT account and&nbsp;
					<a href='https://ifttt.com/create' target='_blank' rel='noopener noreferrer'>create an applet</a> 
					&nbsp;with the following information:
				</p>
				<p><b>Trigger:</b> Trello : Card added to board</p>
				<p><b>Action:</b> Wehbook : Make a web request</p>
				<p><b>Request options:</b></p>
				<ul>
					<li className='url'>
						<b>URL:</b> https://om-integrations.herokuapp.com/trello/cardcreated/{integration._id}
					</li>
					<li className='method'>
						<b>Method:</b> POST
					</li>
					<li className='content-type'>
						<b>Content Type:</b> application/json
					</li>
					<li className='body'>
						<b>Body:</b>
						<pre>{'{"title":"{{Title}}", "description":" {{Description}}", "list": " {{ListName}}", "board":" {{BoardName}}","creator":"{{CreatorUsername}}","cardUrl":"{{CardURL}}"}'}</pre>
					</li>
				</ul>
			</IntegrationInstructionsModal>
		)
	}
}