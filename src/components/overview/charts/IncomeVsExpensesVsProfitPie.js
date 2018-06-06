import React from 'react';
import { Doughnut } from 'react-chartjs-2';

export default function IncomeVsExpensesVsProfitPie(props) {
	const { income, expenses } = props;
	const profit = income - expenses;
	return (
		<div className="income-vs-expenses-vs-profit-pie pie-chart">
			<Doughnut 
			  data={{
				datasets: [{
					data: [income, expenses, profit],
					backgroundColor: ['#FFD046', '#aaa', '#1dbd68'],
					borderColor: 'transparent',
				}],
				labels: ['Income', 'Expenses', 'Profit'],
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