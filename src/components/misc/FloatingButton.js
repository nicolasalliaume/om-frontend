import React, { Component } from 'react';
import { Button } from 'reactstrap';

export default class FloatingButton extends Component {
	render() {
		const { className, ...props } = this.props
		return <Button {...props} className={`${className || ''} floating`} />
	}
} 
	

