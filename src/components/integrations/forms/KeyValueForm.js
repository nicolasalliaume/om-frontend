import React, { Component } from 'react';
import { 
	Col,
	FormGroup,
	Input
} from 'reactstrap';

export default class KeyValueForm extends Component {
	constructor() {
		super();
		this.refs = {};
		this.state = { fields : [] }
	}

	componentWillMount() {
		const { values } = this.props;
		const fields = Object.keys(values).map((key, idx) => {
			return { key : key, value : values[key] }
		})
		
		// one more empty to create a new one
		fields.push({ key: '', value: '' });

		this.setState({ fields : fields });
	}

	addNewField = (event) => {
		let newField = event.target.name === 'key' 
			? { key : event.target.value, value : '' } 
			: { value : event.target.value, key : '' };

		const newFields = this.state.fields.concat([newField]);
		this.setState({ fields : newFields });
		this.props.onChange(this.fieldsToObject(newFields));
	}

	updateField = (idx) => { return (event) => {
		const newFields = this.state.fields.concat([]);
		// update field
		if (event.target.name === 'value') {
			newFields[idx] = { key : newFields[idx].key, value : event.target.value }
		} else {
			newFields[idx] = { key : event.target.value, value : newFields[idx].value }
		}

		// if all fields are completed, add a new one empty at the end
		const empty = newFields.filter(f => !f.key || !f.value).length;
		if (empty === 0) {
			newFields.push({ key: '', value: '' });
		}

		this.setState({ fields : newFields });
		this.props.onChange(this.fieldsToObject(newFields));
	} }

	fieldsToObject = (fields) => {
		const obj = {};
		fields.filter(f => !!f.key && !!f.value).forEach(f => obj[f.key] = f.value);
		return obj;
	}

	render() {
		const { fields } = this.state;
		return (
			<div>
				{ fields.map((field, idx) => {
					return (
						<FormGroup key={idx} row>
							<Col sm={5}>
								<Input type="text" name='key' value={field.key} 
									onChange={this.updateField(idx)} />
							</Col>
							<Col sm={7}>
								<Input type="text" name='value' value={field.value} 
									onChange={this.updateField(idx)} />
							</Col>
						</FormGroup>
					)
				}) }
			</div>
		)
	}
}