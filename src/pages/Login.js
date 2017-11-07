import React, { Component } from 'react';
import { Container, Row, Col, Alert } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { authUserWithAuthToken } from '../actions/users';
import Cookies from 'js-cookie';

import './../styles/Login.css';

const REMEMBER_ME_COOKIE = 'om-rememberme';

class Login extends Component {
	constructor() {
		super()
		this.state = { error: null }
		this.loggingInWithAuthToken = null;
	}
	componentDidMount() {
		this.doLogin();
	}
	doLogin() {
		let authToken = this.props.match.params.authToken || this.getAuthTokenFromCookie();
		if (!authToken) return this.setError('invalid link');

		this.loggingInWithAuthToken = authToken;
		this.props.authUserWithAuthToken(authToken);
	}

	hasLogInCookie = () => !!Cookies.get(REMEMBER_ME_COOKIE);

	getAuthTokenFromCookie() {
		if (this.hasLogInCookie()) {
			const cookie = Cookies.get(REMEMBER_ME_COOKIE);
			const [ userId, authToken ] = cookie.split("|");
			return authToken;
		}
		return undefined;
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
		const authToken = this.loggingInWithAuthToken;
		// setup local storage for fast access from endpoints and stuff
		localStorage.setItem('currentUser',	currentUser._id);
		localStorage.setItem('om-auth-token', authToken);
		// set cookie and move on
		this.setRememberMeCookie(currentUser._id, authToken);
		this.moveToDashboard();
	}
	setRememberMeCookie(userId, authToken) {
		Cookies.set(REMEMBER_ME_COOKIE, `${userId}|${authToken}`, { expires: 30 });
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
								<pre>/login/bunch-of-characters/weird-stuff:some-other-weird-stuff</pre>
								<p>
									If you're missing some of that or the link is correct but not working,
									&nbsp;<a href='mailto:nicolas@on-lab.com' target='_blank' rel="noopener noreferrer">
									let me know</a>&nbsp;
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
