import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

const Checkout = (props) => {
	const checkoutCanceledHandler = () => {
		props.history.goBack();
	};

	const checkoutContinuedHandler = () => {
		props.history.replace('/checkout/contact-data');
	};

	let summary = <Redirect to="/" />;

	if (props.ings) {
		const purchasedRedirect = props.purchased ? <Redirect to="/" /> : null;
		summary = (
			<div>
				{purchasedRedirect}
				<CheckoutSummary
					ingredients={props.ings}
					checkoutCanceled={checkoutCanceledHandler}
					checkoutContinued={checkoutContinuedHandler}
				/>
				<Route
					path={props.match.path + '/contact-data'}
					component={ContactData}
				/>
			</div>
		);
	}
	return summary;
};

Checkout.prototype = {
	ings: PropTypes.object.isRequired,
	purchased: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
	return {
		ings: state.burgerBuilder.ingredients,
		purchased: state.order.purchased,
	};
};

export default connect(mapStateToProps)(Checkout);
