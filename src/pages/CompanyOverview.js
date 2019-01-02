import React, { Component } from 'react';
import { Row, Col, Card } from 'reactstrap';
import moment from 'moment';
import { connect } from 'react-redux';
import OverviewCharts from '../components/overview/charts/OverviewCharts';
import BillingOverviewCards from '../components/overview/cards/BillingOverviewCards';
import { fetchInvoicesListIfNeeded } from '../actions/billing';
import { fetchYearObjectiveIfNeeded } from '../actions/planning';
import { setCompanyOverviewVisibleDate } from '../actions/company_overview';
import YearSelector from '../components/misc/YearSelector';

import './../styles/CompanyOverview.css';


class CompanyOverview extends Component {
	
	componentWillMount() {
		this.props.fetchInvoicesListIfNeeded();
		this.props.fetchYearObjectiveIfNeeded( this.props.visibleYear );
	}
	
	componentWillReceiveProps( props ) {
		this.props.fetchInvoicesListIfNeeded();
		this.props.fetchYearObjectiveIfNeeded( props.visibleYear );
	}

	render() {
		const invoices = this.getInvoicesForVisiblePeriod();
		const start = this.getPeriodStart();
		const end = this.getPeriodEnd();
		const { visibleYear, objectivesByYear } = this.props;
		const yearObjective = objectivesByYear[ visibleYear ] || 0;

		return (
			<div className='overview'>
				<Row className='d-lg-none'>
					<Col lg={1} md={3} xs={6}>
						<Card>
							<YearSelector value={visibleYear} onChange={this.changeVisibleDate} />
						</Card>
					</Col>
				</Row>
				<Row>
					<Col lg={9} xs={12} className='order-sm-2 order-lg-1'>
						<div className='d-lg-block d-none floating-visible-year'>
							<YearSelector value={visibleYear} onChange={this.changeVisibleDate} />
						</div>
						<OverviewCharts invoices={invoices} 
							objective={ yearObjective }
							start={start} 
							end={end} />
					</Col>
					<Col lg={3} xs={12} className='order-sm-1 order-lg-2'>
						<BillingOverviewCards invoices={invoices}
							objective={ yearObjective }
							start={start}
							end={end} />
					</Col>
				</Row>
			</div>
		);
	}

	getPeriodStart = () => moment( this.props.visibleYear, 'YYYY' ).startOf( 'year' )
	getPeriodEnd = () => this.getPeriodStart().clone().add( 11, 'month' ).endOf( 'month' )

	changeVisibleDate = ( date ) => {
		this.props.setCompanyOverviewVisibleDate( date );
	}

	/**
	 * Returns the invoices that are gonna be used for the overview
	 * (withing the date range of the visible period).
	 * 
	 * @return {Array}
	 */
	getInvoicesForVisiblePeriod() {
		const { invoices } = this.props.invoicesList;
		const start = this.getPeriodStart();
		const end = this.getPeriodEnd();
		
		return invoices.filter( i => {
			const invoiceDate = moment( i.invoicing_date );
			return invoiceDate >= start && invoiceDate <= end;
		} );
	}
}

const mapStateToProps = state => ( {
	invoicesList: state.billingView.invoicesList,
	visibleYear: state.companyOverview.visibleYear,
	objectivesByYear: state.planning.objectivesByYear,
} );

const mapDispatchToProps = dispatch => ( {
	fetchInvoicesListIfNeeded: () => dispatch( fetchInvoicesListIfNeeded() ),
	setCompanyOverviewVisibleDate: ( date ) => dispatch( setCompanyOverviewVisibleDate( date ) ),
	fetchYearObjectiveIfNeeded: year => dispatch( fetchYearObjectiveIfNeeded( year ) ),
} );

export default connect( mapStateToProps, mapDispatchToProps )( CompanyOverview );
