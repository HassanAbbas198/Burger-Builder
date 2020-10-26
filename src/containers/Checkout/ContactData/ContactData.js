import React, { useState } from 'react';
import { connect } from 'react-redux';
import axios from '../../../axios-orders';

import classes from './ContactData.module.css';

import * as actions from '../../../store/actions/index';
import { checkValidity } from '../../../shared/validation';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';

const ContactData = (props) => {
	const [orderForm, setOrderForm] = useState({
		name: {
			elementType: 'input',
			elementConfig: {
				type: 'text',
				placeholder: 'Your Name ',
			},
			value: '',
			validation: {
				required: true,
			},
			valid: false,
			touched: false,
		},

		street: {
			elementType: 'input',
			elementConfig: {
				type: 'text',
				placeholder: 'Your Street ',
			},
			value: '',
			validation: {
				required: true,
			},
			valid: false,
			touched: false,
		},
		zipCode: {
			elementType: 'input',
			elementConfig: {
				type: 'text',
				placeholder: 'ZIP Code ',
			},
			value: '',
			validation: {
				required: true,
			},
			valid: false,
			touched: false,
		},
		country: {
			elementType: 'input',
			elementConfig: {
				type: 'text',
				placeholder: 'Your Country ',
			},
			value: '',
			validation: {
				required: true,
			},
			valid: false,
			touched: false,
		},

		email: {
			elementType: 'input',
			elementConfig: {
				type: 'email',
				placeholder: 'Your E-mail',
			},
			value: '',
			validation: {
				required: true,
			},
			valid: false,
			touched: false,
		},

		deliveryMethod: {
			elementType: 'select',
			elementConfig: {
				options: [
					{ value: 'fastest', displayValue: 'Fastest' },
					{ value: 'cheapest', displayValue: 'Cheapest' },
				],
			},
			value: 'fastest',
			validation: {},
			valid: true,
		},
	});

	const [formIsValid, setFormIsValid] = useState(false);

	const orderHandler = async (event) => {
		event.preventDefault();

		// getting the form data from the state
		const formData = {};
		for (let FormElementId in orderForm) {
			formData[FormElementId] = orderForm[FormElementId].value;
		}

		const order = {
			ingredients: props.ings,
			price: props.price,
			orderData: formData,
			userId: props.userId,
		};

		props.onOrderBurger(order, props.token);
	};

	const inputChnagedHandler = (event, inputId) => {
		// this doesn't create a deep clone
		const updatedOrderForm = { ...orderForm };

		// copies the properties inside my selected orderForm element deeply
		const updatedFormElement = {
			...updatedOrderForm[inputId],
		};

		updatedFormElement.value = event.target.value;

		// check validity
		updatedFormElement.valid = checkValidity(
			updatedFormElement.value,
			updatedFormElement.validation
		);

		updatedFormElement.touched = true;

		updatedOrderForm[inputId] = updatedFormElement;

		// form validity
		let formIsValid = true;
		for (let inputId in updatedOrderForm) {
			formIsValid = updatedOrderForm[inputId].valid && formIsValid;
		}

		setOrderForm(updatedOrderForm);
		setFormIsValid(formIsValid);
	};

	const formElementArray = [];
	for (let key in orderForm) {
		formElementArray.push({
			id: key,
			config: orderForm[key],
		});
	}
	let form = (
		<form onSubmit={orderHandler}>
			{formElementArray.map((formElement) => {
				return (
					<Input
						key={formElement.id}
						elementType={formElement.config.elementType}
						elementConfig={formElement.config.elementConfig}
						value={formElement.config.value}
						invalid={!formElement.config.valid}
						shouldValidate={formElement.config.validation}
						touched={formElement.config.touched}
						changed={(event) => inputChnagedHandler(event, formElement.id)}
					/>
				);
			})}
			<Button btnType="Success" disabled={!formIsValid}>
				ORDER
			</Button>
		</form>
	);

	if (props.loading) {
		form = <Spinner />;
	}
	return (
		<div className={classes.ContactData}>
			<h4>Enter your contact data</h4>
			{form}
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		ings: state.burgerBuilder.ingredients,
		price: state.burgerBuilder.totalPrice,
		loading: state.order.loading,
		token: state.auth.token,
		userId: state.auth.userId,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onOrderBurger: (orderData, token) =>
			dispatch(actions.purchaseBurger(orderData, token)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withErrorHandler(ContactData, axios));
