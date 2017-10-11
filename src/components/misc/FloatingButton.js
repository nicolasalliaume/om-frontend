import React, { Component } from 'react';
import { Button } from 'reactstrap';

export default class FloatingButton extends Component {
	render() {
		const { className, ...props } = this.props
		return (
			<div className='floating-btn'>
				<Button {...props} className={`${className || ''}`} />
			</div>
		);
	}
} 
	

