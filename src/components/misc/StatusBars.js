import React, { Component } from 'react';

export default class StatusBars extends Component {
	render() {
		const orderedBars = this.props.config.slice();
		orderedBars.sort((a, b) => {
			if (a.start == b.start) {
				return (a.width < b.width) ? 1 : -1;
			}
			return a.start < b.start ? 1 : -1;
		})
		const bars = orderedBars.map((b) => {
			const style = { 
				width : b.width + '%', 
				left  : b.start + '%' 
			};
			return (
				<div key={b.class} className={`bar ${b.class}`} style={style}>
					<div className="content">{b.label}</div>
				</div>
			)
		})
		return (
			<div className="status-bars">{bars}</div>
		)
	}
}
