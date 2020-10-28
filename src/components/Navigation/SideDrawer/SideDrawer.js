import React from 'react';
import PropTypes from 'prop-types';

import classes from './SideDrawer.module.css';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';

const SideDrawer = (props) => {
	let attachedClasses = [classes.SideDrawer, classes.Close];
	if (props.show) {
		attachedClasses = [classes.SideDrawer, classes.Open];
	}

	return (
		<React.Fragment>
			<Backdrop show={props.show} clicked={props.closed} />
			<div className={attachedClasses.join(' ')} onClick={props.closed}>
				<Logo height="11%" marginBottom="32px" />
				<nav>
					<NavigationItems isAuth={props.isAuth} />
				</nav>
			</div>
		</React.Fragment>
	);
};

SideDrawer.prototype = {
	isAuth: PropTypes.bool.isRequired,
	show: PropTypes.bool.isRequired,
	closed: PropTypes.func.isRequired,
};

export default SideDrawer;
