import React, { Component } from 'react';
import { Container, Row, Col, Alert } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { authUserWithAuthToken } from '../actions/users';

import './../styles/Login.css';

class Login extends Component {
	constructor() {
		super()
		this.state = { error: null }
	}
	componentDidMount() {
		this.doLogin();
	}
	componentWillReceiveProps(props) {
		this.testLoginResponse(props.currentUser);
	}
	testLoginResponse(currentUser) {
		if (currentUser !== null) {
			if (currentUser.error !== undefined) {
				this.setError(currentUser.error);
			} else {
				this.finishLogin(currentUser.user);
			}
		}
	}
	setError(errorMessage) {
		this.setState({ error : errorMessage })
	}
	finishLogin(currentUser) {
		// logged in correctly
		// setup local storage for fast access from endpoints and stuff
		const { userId, authToken } = this.props.match.params;
		localStorage.setItem('currentUser',	userId);
		localStorage.setItem('om-auth-token', authToken);

		this.moveToDashboard();
	}
	doLogin() {
		const { userId, authToken } = this.props.match.params;
		if (!userId || !authToken) {
			return this.setError('invalid link');
		}
		this.props.authUserWithAuthToken(authToken);
	}
	moveToDashboard() {
		this.props.history.push('/');
	}
	render() {
		const { error } = this.state;
		return (
			<Container className='login'>
				<Row>
					<Col lg={6} xs={12}>
						{ !error && <p>You're being redirected...</p> }
						{ error && 
							<Alert color='danger' className='login-invalid'>
								<p><b>{ error }</b></p>
								<p>I'm sorry my friend, but I really need to know who you are to show you your own stuff!</p>
								<p>But let me help you out.</p>
								<p>Check that the link is correct. Should look somethin' like this:<br/></p>
								<pre>/login/bunch-of-characters/weird-shit:some-other-weird-shit</pre>
								<p>
									If you're missing some of that or the link is correct but not working,
									&nbsp;<a href='mailto:nicolas@on-lab.com' target='_blank'>let me know</a>&nbsp;
									and I'll give you a hand. Don't forget to add who you are in the email!
								</p>
							</Alert>
						}
					</Col>
				</Row>
			</Container>
		)
	}
}

const mapStateToProps = state => { return {
	currentUser : state.currentUser
}}

const mapDispatchToProps = dispatch => { return {
	authUserWithAuthToken : (uid, token) => dispatch(authUserWithAuthToken(uid, token))
}}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
