import React from 'react';
import PropTypes from 'prop-types';

import classes from './CheckoutSummary.module.css';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';

const CheckoutSummary = (props) => {
	return (
		<div className={classes.CheckoutSummary}>
			<h1>Hope it tastes well!</h1>
			<div style={{ width: '100%', margin: 'auto' }}>
				<Burger ingredients={props.ingredients} />
			</div>
			<Button btnType="Danger" clicked={props.checkoutCanceled}>
				CANCEL
			</Button>
			<Button btnType="Success" clicked={props.checkoutContinued}>
				CONTINUE
			</Button>
		</div>
	);
};

CheckoutSummary.prototype = {
	ingredients: PropTypes.object.isRequired,
	checkoutCanceled: PropTypes.func.isRequired,
	checkoutContinued: PropTypes.func.isRequired,
};

export default CheckoutSummary;
