import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';

export default class BarsVsChart extends Component {
	render() {
		return (
			<Bar data={this.getData()} options={this.getOptions()} />
		)
	}

	getData() {
		return {
			labels: this.props.labels || this.defaultLabels(),
			datasets: [
				Object.assign({
					type: 'bar',
					label: 'Billing',
					fill: false,
					backgroundColor: '#52ffc9',
					borderColor: '#52ffc9',
					hoverBackgroundColor: '#52ffc9',
					hoverBorderColor: '#52ffc9',
					yAxisID: 'y-axis-1'
				}, this.props.bars1),
				Object.assign({
					type: 'bar',
					label: 'Expenses',
					fill: false,
					backgroundColor: '#ffd761',
					borderColor: '#ffd761',
					hoverBackgroundColor: '#ffd761',
					hoverBorderColor: '#ffd761',
					yAxisID: 'y-axis-1'
				}, this.props.bars2)
			]
		}
	}

	getOptions = () => ({
		responsive: true,
		tooltips: {
			mode: 'label'
		},
		elements: {
			line: {
				fill: false
			}
		},
		scales: {
			xAxes: [{
				display: true,
				gridLines: {
					display: false
				}
			}],
			yAxes: [
			{
				type: 'linear',
				display: true,
				position: 'left',
				id: 'y-axis-1',
				gridLines: {
					display: false
				}
			}
			]
		}
	})

	getScaleMax = () => {
		const lineMax = Math.max(...this.props.line.data);
		const barsMax = Math.max(...this.props.bars.data);
		const max = Math.max(lineMax, barsMax);
		return max + max*0.10;
	}

	defaultLabels = () => ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
}