import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';

export default class MixedBarsLineChart extends Component {
	render() {
		return (
			<Bar data={this.getData()} options={this.getOptions()} />
		)
	}

	getData() {
		const avgData = [0,0,0,0,0,0,0,0,0,0,0,0].map(_ => this.props.avg);
		return {
			labels: this.props.labels || this.defaultLabels(),
			datasets: [
				Object.assign({
					label: 'Objective',
					type:'line',
					fill: false,
					borderColor: '#17a2b8',
					backgroundColor: '#17a2b8',
					pointBorderColor: '#17a2b8',
					pointBackgroundColor: '#17a2b8',
					pointHoverBackgroundColor: '#17a2b8',
					pointHoverBorderColor: '#17a2b8',
					yAxisID: 'y-axis-2'
				}, this.props.line),
				{
					label: 'Average',
					type:'line',
					fill: false,
					borderColor: '#ffd761',
					backgroundColor: '#ffd761',
					pointBorderColor: '#ffd761',
					pointBackgroundColor: '#ffd761',
					pointHoverBackgroundColor: '#ffd761',
					pointHoverBorderColor: '#ffd761',
					yAxisID: 'y-axis-2',
					data: avgData
				},
				Object.assign({
					type: 'bar',
					label: 'Sales',
					fill: false,
					backgroundColor: '#52ffc9',
					borderColor: '#52ffc9',
					hoverBackgroundColor: '#52ffc9',
					hoverBorderColor: '#52ffc9',
					yAxisID: 'y-axis-1'
				}, this.props.bars)
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
				},
				ticks: {
					beginAtZero: true,
					max: this.getScaleMax()
				}
			},
			{
				type: 'linear',
				display: false,
				position: 'right',
				id: 'y-axis-2',
				gridLines: {
					display: false
				},
				ticks: {
					beginAtZero: true,
					max: this.getScaleMax()
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