import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import HoursBars from './HoursBars';
import { Link } from 'react-router-dom';
import { encodeProjectName } from '../../../utils';

export default class ProjectsBillingStatusListItem extends Component {
	render() {
		const project = this.props.project;
		const bars = this.getBarsConfig();
		const className = this.isOverworked() 
			? 'overworked' 
			: this.isNearLimit() ? 'nearlimit' : '';
		return (
			<li className={`projects-list-item row ${className}`}>
				<Col xs={12}>
					<h4>
						<Link to={`/project/${encodeProjectName(project.name)}`}>{project.name}</Link>
					</h4>
				</Col>
				<Col xs={12}>
					<HoursBars config={bars}/>
				</Col>
			</li>
		)
	}

	getBarsConfig() {
		const { project } = this.props;
		const isOverworked = this.isOverworked();
		const isNearLimit = this.isNearLimit();
		const sold = project.hours_sold;
		const billed = this.getHoursBilled();
		const executed = this.getHoursExecuted();
		const overwork = this.getHoursOverworked();
		const total = this.getMaxHours();

		if (Math.ceil(executed) === Math.ceil(billed) 
				&& Math.ceil(billed) === Math.ceil(total)) {
			return [{
				class : 'green',
				start : 0,
				width : 100,
				label : Math.ceil(total)
			}]
		}

		return [
			{
				class : isOverworked ? 'red' : 'grey',
				start : (isOverworked ? sold / executed : 0) * 100,
				width : (isOverworked ? overwork / executed : 1) * 100,
				label : Math.ceil(total)
			},{
				class : 'green',
				start : 0,
				width : (billed / total) * 100,
				label : billed
			},{
				class : 'blue',
				start : 0,
				width : (isOverworked ? sold / executed : executed / sold) * 100,
				label : Math.ceil(isOverworked ? sold : executed)
			}
		]
	}

	getMaxHours() {
		const p = this.props.project;
		return Math.max(this.getHoursExecuted(), p.hours_sold);
	}

	getHoursExecuted() {
		const p = this.props.project;
		return p.hours_sold_unit === 'monthly' 
			? p.executed_hours_month 
			: p.executed_hours_total;
	}

	getHoursBilled() {
		const p = this.props.project;
		return p.hours_sold_unit === 'monthly' 
			? p.billed_hours_month 
			: p.billed_hours_total;
	}

	getHoursOverworked() {
		const p = this.props.project;
		const hours_executed = this.getHoursExecuted();
		return hours_executed - p.hours_sold; 
	}

	isNearLimit() {
		const p = this.props.project;
		const hours_executed = this.getHoursExecuted();
		return p.hours_sold > hours_executed 
			&& hours_executed / p.hours_sold > 0.8;
	}

	isOverworked() {
		return this.getHoursOverworked() > 0;
	}

}