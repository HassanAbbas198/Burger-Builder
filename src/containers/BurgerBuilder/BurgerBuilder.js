import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';

import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Burger from '../../components/Burger/Burger';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';

export const BurgerBuilder = (props) => {
	const [purchasing, setPurchasing] = useState(false);

	const { onInitIngredients } = props;

	useEffect(() => {
		onInitIngredients();
	}, [onInitIngredients]);

	const updatePurchaseState = () => {
		const ingredients = props.ings;

		const sum = Object.keys(ingredients)
			.map((igKey) => {
				return ingredients[igKey];
			})
			.reduce((sum, el) => {
				return sum + el;
			}, 0);

		return sum > 0;
	};

	const purchaseHandler = () => {
		if (props.isAuth) {
			setPurchasing(true);
		} else {
			props.onSetAuthRedirectPath('/checkout');
			props.history.push('/auth');
		}
	};

	const purchaseCancelHandler = () => {
		setPurchasing(false);
	};

	const purchaseContinueHandler = () => {
		props.onInitPurchase();
		props.history.push('/checkout');
	};

	const disabledInfo = {
		...props.ings,
	};

	for (let key in disabledInfo) {
		disabledInfo[key] = disabledInfo[key] <= 0;
	}

	let orderSummary = null;
	let burger = props.error ? (
		<p style={{ textAlign: 'center' }}>Ingredients can't be loaded</p>
	) : (
		<Spinner />
	);

	if (props.ings) {
		burger = (
			<React.Fragment>
				<Burger ingredients={props.ings} />
				<BuildControls
					ingredientAdded={props.onIngredientAdded}
					ingredientRemoved={props.onIngredientRemoved}
					disabled={disabledInfo}
					purchasable={updatePurchaseState()}
					price={props.price}
					ordered={purchaseHandler}
					isAuth={props.isAuth}
				/>
			</React.Fragment>
		);

		orderSummary = (
			<OrderSummary
				ingredients={props.ings}
				purchaseCanceled={purchaseCancelHandler}
				purchaseContinued={purchaseContinueHandler}
				price={props.price}
			/>
		);
	}

	return (
		<React.Fragment>
			<Modal show={purchasing} modalClosed={purchaseCancelHandler}>
				{orderSummary}
			</Modal>
			{burger}
		</React.Fragment>
	);
};

BurgerBuilder.prototype = {
	ings: PropTypes.object.isRequired,
	price: PropTypes.number.isRequired,
	isAuth: PropTypes.bool.isRequired,
	error: PropTypes.string.isRequired,
	onInitIngredients: PropTypes.func.isRequired,
	onIngredientAdded: PropTypes.func.isRequired,
	onIngredientRemoved: PropTypes.func.isRequired,
	onInitPurchase: PropTypes.func.isRequired,
	onSetAuthRedirectPath: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
	return {
		ings: state.burgerBuilder.ingredients,
		price: state.burgerBuilder.totalPrice,
		error: state.burgerBuilder.error,
		isAuth: state.auth.token !== null,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
		onIngredientRemoved: (ingName) =>
			dispatch(actions.removeIngredient(ingName)),
		onInitIngredients: () => dispatch(actions.initIngredients()),
		onInitPurchase: () => dispatch(actions.purchaseInit()),
		onSetAuthRedirectPath: (path) =>
			dispatch(actions.setAuthRedirectPath(path)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
