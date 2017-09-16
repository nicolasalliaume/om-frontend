import React, { Component } from 'react';

export default (props) =>
	<i className={`fa ${[...Object.keys(props)].join(' ')}`}  aria-hidden="true"></i>
