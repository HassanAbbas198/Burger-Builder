import React, { useState } from 'react';
import { connect } from 'react-redux';

import classes from './Layout.module.css';

import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

const Layout = (props) => {
	const [showSideDrawer, setshowSideDrawer] = useState(false);

	const sideDrawerToggleHandler = () => {
		setshowSideDrawer(!showSideDrawer);
	};

	return (
		<React.Fragment>
			<Toolbar
				isAuth={props.isAuthenticated}
				toggleClicked={sideDrawerToggleHandler}
			/>
			<SideDrawer
				isAuth={props.isAuthenticated}
				show={showSideDrawer}
				closed={sideDrawerToggleHandler}
			/>
			<main className={classes.Content}>{props.children}</main>
		</React.Fragment>
	);
};

const mapStateToProps = (state) => {
	return {
		isAuthenticated: state.auth.token !== null,
	};
};

export default connect(mapStateToProps)(Layout);
