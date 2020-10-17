import React from 'react';

import classes from './Toolbar.module.css';

const Toolbar = (props) => (
	<header className={classes.Toolbar}>
		<div>menu</div>
		<div>logo</div>
		<nav>list</nav>
	</header>
);

export default Toolbar;
