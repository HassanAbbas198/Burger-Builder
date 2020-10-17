import React from 'react';

import classes from './Logo.module.css';

import burgerLogo from '../../assets/images/burger-logo.png';

// src will refer to a string to the path where webpack stores the img
const Logo = (props) => (
	<div
		className={classes.Logo}
		style={{ height: props.height, marginBottom: props.marginBottom }}
	>
		<img src={burgerLogo} alt="logo" />
	</div>
);

export default Logo;
