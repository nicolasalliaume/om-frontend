import React, { Component } from 'react';
import { Creatable } from 'react-select';

export default class TagsInput extends Component {
	onChange = (value) => {
		// dispatch generated event to parent component
		const event = {
			target : { 
				name  : this.props.name,
				value : value.map(o => this.removeExtraText(o.value)) // send back an array of tags
			}
		}
		this.props.onChange(event);
	}

	classes = () => (this.props.className || '') + ' form-control no-placeholder tags-input';
	
	createOnReturn = (keyCode) => keyCode === 13 || keyCode === 32;

	mapValues = (values) => values.map(v => { return {label: v, value: v} })

	removeExtraText = (text) => text.replace("Create option \"", '').replace('"', '').trim()
	
	render() {
		const { className, value, ...props } = this.props;
		
		return (
			<Creatable clearable={false} className={this.classes()} {...props} 
				value={this.mapValues(value)} onChange={this.onChange} multi={true} 
				shouldKeyDownEventCreateNewOption={this.createOnReturn} />
		)
	}
}
