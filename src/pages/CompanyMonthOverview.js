import React, { Component } from 'react';
import { withRouter }  from 'react-router';
import { Row, Col, Card, CardBlock, Label } from 'reactstrap';
import { fetchMonthlyOverviewInvoicesIfNeeded, invalidateMonthlyOverview } from '../actions/company_overview';
import { connect } from 'react-redux';
import YearSelector from '../components/misc/YearSelector';
import MonthSelector from '../components/misc/MonthSelector';
import InvoicesList from '../components/billing/invoices/InvoicesList';
import IncomeVsExpensesPie from '../components/overview/charts/IncomeVsExpensesPie';
import IncomeVsExpensesVsProfitPie from '../components/overview/charts/IncomeVsExpensesVsProfitPie';
import SquareDiv from '../components/misc/SquareDiv';

class CompanyMonthOverview extends Component {
	componentWillMount() {
		const { year, month } = this.props.match.params;
		this.fetch(year, month);
	}

	componentWillReceiveProps(props) {
		const { year, month } = props.match.params;
		this.fetch(year, month);
	}

	fetch(year, month) {
		this.props.fetchMonthlyOverviewInvoicesIfNeeded(year, month);
	}

	render() {
		const { month, year } = this.props.match.params;
		const { monthlyOverview } = this.props;
		const { income, expenses } = this.calculateIncomeAndExpenses(monthlyOverview.invoices);
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
					<Col lg={4} xs={12} className='order-sm-2 order-lg-1'>
						<InvoicesList invoices={monthlyOverview.invoices} />
					</Col>
					<Col lg={3} xs={12} className='order-sm-1 order-lg-2'>
						<SquareDiv>
							<IncomeVsExpensesPie income={income} expenses={expenses} />
						</SquareDiv>
					</Col>
					<Col lg={3} xs={12} className='order-sm-1 order-lg-2'>
						<SquareDiv>
							<IncomeVsExpensesVsProfitPie income={income} expenses={expenses} />
						</SquareDiv>
					</Col>
				</Row>
			</div>
		)
	}

	changeVisibleYear(year) {
		this.props.invalidateMonthlyOverview();
		this.props.history.push(`/overview/${year}/${this.props.match.params.month}`);
	}

	changeVisibleMonth(month) {
		this.props.invalidateMonthlyOverview();
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
	monthlyOverview: state.monthlyOverview,
})

const mapDispatchToProps = dispatch => ({
	fetchMonthlyOverviewInvoicesIfNeeded: (y, m) => dispatch(fetchMonthlyOverviewInvoicesIfNeeded(y, m)),
	invalidateMonthlyOverview: (y, m) => dispatch(invalidateMonthlyOverview()),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CompanyMonthOverview));