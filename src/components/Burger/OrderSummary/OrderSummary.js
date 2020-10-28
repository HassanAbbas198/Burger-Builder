import React from 'react';
import PropTypes from 'prop-types';

import Button from '../../../components/UI/Button/Button';

const OrderSummary = (props) => {
	const ingredients = props.ingredients;

	const ingredientSummary = Object.keys(ingredients).map((igKey) => {
		return (
			<li key={igKey}>
				<span style={{ textTransform: 'capitalize' }}>{igKey}</span>:{' '}
				{ingredients[igKey]}
			</li>
		);
	});
	return (
		<React.Fragment>
			<h3>Your order</h3>
			<p>A delicious burger with the following ingredients: </p>
			<ul>{ingredientSummary}</ul>
			<p>
				<strong>Total price: ${props.price.toFixed(2)}</strong>
			</p>
			<p>Continue to checkout?</p>
			<Button btnType="Danger" clicked={props.purchaseCanceled}>
				CANCEL
			</Button>
			<Button btnType="Success" clicked={props.purchaseContinued}>
				CONTINUE
			</Button>
		</React.Fragment>
	);
};

OrderSummary.prototype = {
	ingredients: PropTypes.object.isRequired,
	price: PropTypes.number.isRequired,
	purchaseCanceled: PropTypes.func.isRequired,
	purchaseContinued: PropTypes.func.isRequired,
};

export default OrderSummary;
