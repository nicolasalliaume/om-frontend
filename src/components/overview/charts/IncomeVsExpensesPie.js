import React from 'react';
import { Doughnut } from 'react-chartjs-2';

export default function IncomeVsExpensesPie(props) {
	const { income, expenses } = props;
	return (
		<div className="income-vs-expenses-pie pie-chart">
			<Doughnut 
			  data={{
				datasets: [{
					data: [income, expenses],
					backgroundColor: ['#FFD046', '#aaa'],
					borderColor: 'transparent',
				}],
				labels: ['Income', 'Expenses'],
			  }} options={{
				responsive: true,
				maintainAspectRatio: false,
				legend: {
					position: "bottom",
				},
			  }} 
			/>
		</div>
	)
}