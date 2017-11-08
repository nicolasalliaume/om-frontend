import React, { Component } from 'react';
import { Col, Button } from 'reactstrap';
import Icon from '../../misc/Icon';

export default class UsersAdminCardListItem extends Component {
	render() {
		let { 
			item, 
			options, 
			onDelete, 
			onEdit, 
			onEnable, 
			className, 
			enabled,
			enableIcon,
			disableIcon
		} = this.props;
		if (options.includes('enable')) {
			enableIcon = { [enableIcon || 'fa-plus']: true };
			disableIcon = { [disableIcon || 'fa-minus']: true };
		} 
		return (
			<li className={`row ${className}`}>
				<Col md={8} xs={12}>
					<h4>{item.label}</h4>
				</Col>
				<Col md={4} xs={12} className='text-right list-item-options'>
					{ options.includes('edit') && 
						<Button onClick={onEdit}><Icon fa-edit/></Button>
					}
					{ options.includes('enable') && 
						<Button onClick={onEnable}>
							{ enabled && <Icon {...disableIcon}/> }
							{ !enabled && <Icon {...enableIcon}/> }
						</Button>
					}
					{ options.includes('delete') && 
						<Button onClick={onDelete}><Icon fa-remove/></Button>
					}
				</Col>
			</li>
		)
	}
}