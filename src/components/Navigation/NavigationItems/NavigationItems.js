import React from 'react';

import classes from './NavigationItems.module.css';

import NavigationItem from './NavigationItem/NavigationItem';

const NavigationItems = (props) => {
	let logout = <NavigationItem link="/auth">Authenticate</NavigationItem>;
	let orders = null;

	if (props.isAuth) {
		logout = <NavigationItem link="/logout">Logout</NavigationItem>;
		orders = <NavigationItem link="/orders">Orders</NavigationItem>;
	}

	return (
		<ul className={classes.NavigationItems}>
			<NavigationItem link="/">Burger Builder</NavigationItem>
			{orders}
			{logout}
		</ul>
	);
};

export default NavigationItems;
