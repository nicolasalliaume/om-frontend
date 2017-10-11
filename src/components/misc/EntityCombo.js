import React, { Component } from 'react';
import { Input } from 'reactstrap';

export default class EntityCombo extends Component {
	componentDidMount() {
		if (this.props.async) this.props.fetchItems();
	}
	componentWillReceiveProps(props) {
		if (this.props.async) this.props.fetchItems();
	} 
	selectItem = (event) => {
		const selected = event.target.value;
		this.props.onChange({ target: {
			value : selected,
			name  : this.props.name 
		}});
	}
	render() {
		const { items, value, placeholder } = this.props;
		const disabled = items.length === 0;
		return (
			<Input type="select" 
				value={value} 
				disabled={disabled} 
				onChange={this.selectItem}>
				
				<option key='null' value=''>{placeholder || 'Select...'}</option>
				{ items.map((i, idx) => 
					<option key={idx} value={i.value}>{i.label}</option>
				)}
				{ disabled && <option value={null}>Loading...</option> }
			</Input>
		)
	}
}
