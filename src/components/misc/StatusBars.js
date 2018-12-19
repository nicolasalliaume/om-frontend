import React, { Component } from 'react';
import { UncontrolledTooltip } from 'reactstrap';

export default class StatusBars extends Component {
	render() {
		const orderedBars = this.props.config.slice();
		orderedBars.sort( ( a, b ) => {
			if ( a.start === b.start ) {
				return b.width - a.width;
			}
			return a.start < b.start ? 1 : -1;
		} );
		const bars = orderedBars.map( ( b, idx ) => {
			const uniqueId = this.getId();
			const style = { 
				width : b.width + '%', 
				left  : b.start + '%' 
			};
			return (
				<React.Fragment key={b.class}>
					<div className={`bar ${b.class}`} id={uniqueId} style={style}>
						<div className="content">{b.label}</div>
					</div>
					{ b.tooltip && (
						<UncontrolledTooltip placement="right" target={uniqueId} delay={{ show: 1000, hide: 0 }}>
							{b.tooltip}
						</UncontrolledTooltip>
					)}
				</React.Fragment>
			);
		} );
		return (
			<div className="status-bars">{bars}</div>
		);
	}

	getId = _ => '_' + Math.random().toString( 36 ).substr( 2, 9 )
}
