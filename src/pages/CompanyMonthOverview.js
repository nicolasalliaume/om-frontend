import React, { Component } from 'react';
import { withRouter }  from 'react-router';
import { Row, Col, Card, CardBlock, Label } from 'reactstrap';
import { connect } from 'react-redux';
import YearSelector from '../components/misc/YearSelector';
import MonthSelector from '../components/misc/MonthSelector';
import InvoicesOverviewCard from '../components/overview/invoices/InvoicesOverviewCard';
import IncomeVsExpensesPie from '../components/overview/charts/IncomeVsExpensesPie';
import IncomeVsExpensesVsProfitPie from '../components/overview/charts/IncomeVsExpensesVsProfitPie';
import SquareDiv from '../components/misc/SquareDiv';
import BillingOverviewCard from '../components/overview/cards/BillingOverviewCard';
import { fetchInvoicesListIfNeeded } from '../actions/billing';
import moment from 'moment';

class CompanyMonthOverview extends Component {
	componentWillMount() {
		this.props.fetchInvoicesListIfNeeded();
	}

	componentWillReceiveProps(props) {
		props.fetchInvoicesListIfNeeded();

		console.log(props.invoicesList);

		// const invoices = props.invoicesList.invoices
		// 	.filter(i => moment(i.invoicing_date).format('YYYY-MM') === filter)
		// 	.sort((a, b) => moment(b.invoicing_date) - moment(a.invoicing_date));

		// console.log(( invoices[0] || {} ).amount);
	}

	getInvoices(year, month) {
		const filter = `${year}-${month}`;
		return this.props.invoicesList.invoices
			.filter(i => moment(i.invoicing_date).format('YYYY-MM') === filter)
			.sort((a, b) => moment(b.invoicing_date) - moment(a.invoicing_date))
	}

	render() {
		const { month, year } = this.props.match.params;
		const invoices = this.getInvoices(year, month);

		// console.log(( invoices[0] || {} ).amount);

		const { income, expenses } = this.calculateIncomeAndExpenses(invoices);
		return (
			<div className='overview'>
				<Row>
					<Col lg={2} md={6} xs={8}>
						<Row>
							<Col xs={7}><YearSelector value={year} onChange={this.changeVisibleYear.bind(this)} /></Col>
							<Col xs={5}><MonthSelector value={month} onChange={this.changeVisibleMonth.bind(this)} /></Col>
						</Row>
					</Col>
				</Row>
				<Row>
					<Col lg={4} xs={12}>
						<InvoicesOverviewCard invoices={invoices} />
					</Col>
					<Col lg={4} xs={12}>
						<SquareDiv>
							<IncomeVsExpensesVsProfitPie income={income} expenses={expenses} />
						</SquareDiv>
					</Col>
					<Col lg={3} xs={6} className='offset-lg-1'>
						<div className='overview-billing-cards'>
							<BillingOverviewCard 
								className='month-income-card'
								amount={income} 
								title={'<b>Income</b>'} />

							<BillingOverviewCard 
								className='month-expenses-card'
								amount={expenses} 
								title={'<b>Expenses</b>'} />

							<BillingOverviewCard 
								className='month-profit-card'
								amount={income-expenses} 
								title={'<b>Profit</b>'} />
						</div>
					</Col>
				</Row>
			</div>
		)
	}

	changeVisibleYear(year) {
		this.props.history.push(`/overview/${year}/${this.props.match.params.month}`);
	}

	changeVisibleMonth(month) {
		this.props.history.push(`/overview/${this.props.match.params.year}/${month}`);
	}

	calculateIncomeAndExpenses(invoices) {
		let income = 0, expenses = 0;
		invoices.forEach(i => {
			if (i.direction === 'out') income += i.amount;
			else expenses += i.amount;
		})
		return { income, expenses };
	}
}

const mapStateToProps = state => ({
	invoicesList: state.billingView.invoicesList,
})

const mapDispatchToProps = dispatch => ({
	fetchInvoicesListIfNeeded : () => dispatch(fetchInvoicesListIfNeeded())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CompanyMonthOverview));