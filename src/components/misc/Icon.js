import React, { Component } from 'react';
import { Tooltip } from 'reactstrap';

export default class Icon extends Component {
	constructor(props) {
		super(props);
		this.toggle = this.toggle.bind(this);
		this.state = { tooltipOpen: false };
	}
	toggle() {
		this.setState({
			tooltipOpen: !this.state.tooltipOpen
		});
	}
	render() {
		const { tooltip, id, ...props } = this.props;
		return (
			<i className={`fa ${[...Object.keys(props)].join(' ')}`} id={id} aria-hidden="true">
				{ tooltip && 
					<Tooltip placement="bottom" isOpen={this.state.tooltipOpen} target={id} toggle={this.toggle}>
						{ tooltip }
					</Tooltip>
				}
			</i>
		)
		
	}
} 
	