import React from 'react';
import PropTypes from 'prop-types';

import classes from './Toolbar.module.css';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const Toolbar = (props) => (
	<header className={classes.Toolbar}>
		<DrawerToggle clicked={props.toggleClicked} />
		<Logo />
		<nav className={classes.DesktopOnly}>
			<NavigationItems isAuth={props.isAuth} />
		</nav>
	</header>
);

Toolbar.prototype = {
	isAuth: PropTypes.bool.isRequired,
	toggleClicked: PropTypes.func.isRequired,
};

export default Toolbar;
