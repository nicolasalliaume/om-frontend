import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import Icon from '../misc/Icon';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { dismissMessage } from '../../actions/messages';

class MessagesBar extends Component {
	constructor() {
		super();
		this.dismissTimer = null;
	}

	componentDidMount() {
		if (this.getMessageToDisplay(this.props.messages)) {
			this.setupTimer();
		}
	}

	componentWillReceiveProps(props) {
		if (this.getMessageToDisplay(props.messages)) {
			clearInterval(this.dismissTimer);
			this.setupTimer();
		}
	}

	setupTimer = () => {
		this.dismissTimer = setTimeout(this.dismiss, 3000);
	}

	getMessageToDisplay = (messages) => messages.length > 0 ? messages[0] : null;
	
	dismiss = () => this.props.dismissMessage();
	
	render() {
		const message = this.getMessageToDisplay(this.props.messages);
		return (
			<ReactCSSTransitionGroup
			  transitionName="message-bar-animation"
			  transitionLeave={true}
			  transitionAppear={true}
			  transitionAppearTimeout={2500}
			  transitionEnterTimeout={1700}
			  transitionLeaveTimeout={1000}>
				{ message && 
					<Row key='messages-bar' className={`messages-bar text-center ${message.type}`}>
						<Col xs={12} className='text-bar'>
							<span className='title'>{message.title}:</span>
							<span className='message'>{message.message}</span>
						</Col>
						<button className='dismiss' onClick={this.dismiss}>
							<Icon fa-close fa-2x thin />
						</button>
					</Row>
				}
			</ReactCSSTransitionGroup>
		)
	}
}

const mapStateToProps = state => { return {
	messages : state.messages
}}

const mapDispatchToProps = dispatch => { return {
	dismissMessage : () => dispatch(dismissMessage())
}}

export default connect(mapStateToProps, mapDispatchToProps)(MessagesBar);