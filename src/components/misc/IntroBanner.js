import React, { Component } from 'react';
import Icon from './Icon';
import { Button } from 'reactstrap';
import Cookies from 'js-cookie';

const SEEN_INTRO_COOKIE_PREFIX = 'om-intro--';

export default class IntroBanner extends Component {
	constructor(props) {
		super();
		this.state = { 
			name: props.name,
			show: this.shouldShow(props.name),
		}
	}

	hasCookie = (name) => !!Cookies.get(this.getCookieName(name));

	shouldShow = (name) => !this.hasCookie(name);
	
	render() {
		if (this.state.show) {
			return (
				<div className="intro-banner">
					<div className="backdrop" onClick={this.close.bind(this)}></div>
					<div className="wrap">
						<div className="inner">
							<Button className="close" onClick={this.close.bind(this)}><Icon fa-remove /></Button>
							<img src={`https://s3-us-west-2.amazonaws.com/onlab-tmp-bucket/${this.props.name}.png`} alt="" />
						</div>
					</div>
				</div>
			)
		}
		return (<span/>);
	}
	close() {
		this.setState({show: false})
		Cookies.set(this.getCookieName(this.state.name), true, { expires: 999 })
	}
	getCookieName = (name) => `${SEEN_INTRO_COOKIE_PREFIX}${name}`
}