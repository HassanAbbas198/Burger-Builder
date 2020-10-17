import React from 'react';

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
			<div className={attachedClasses.join(' ')}>
				<Logo height="11%" marginBottom="32px" />
				<nav>
					<NavigationItems />
				</nav>
			</div>
		</React.Fragment>
	);
};

export default SideDrawer;
