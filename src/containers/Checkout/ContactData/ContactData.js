import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from '../../../axios-orders';

import classes from './ContactData.module.css';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
	state = {
		orderForm: {
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
		},
		formIsValid: false,
		loading: false,
	};

	orderHandler = async (event) => {
		event.preventDefault();
		this.setState({ loading: true });

		// getting the form data from the state
		const formData = {};
		for (let FormElementId in this.state.orderForm) {
			formData[FormElementId] = this.state.orderForm[FormElementId].value;
		}

		const order = {
			ingredients: this.props.ings,
			price: this.props.price,
			orderData: formData,
		};
		await axios.post('/orders.json', order);
		this.setState({ loading: false });
		this.props.history.push('/');
	};

	checkValidity = (value, rules) => {
		let isValid = true;

		if (rules.required) {
			isValid = value.trim() !== '' && isValid;
		}

		return isValid;
	};

	inputChnagedHandler = (event, inputId) => {
		// this doesn't create a deep clone
		const updatedOrderForm = { ...this.state.orderForm };

		// copies the properties inside my selected orderForm element deeply
		const updatedFormElement = {
			...updatedOrderForm[inputId],
		};

		updatedFormElement.value = event.target.value;

		// check validity
		updatedFormElement.valid = this.checkValidity(
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

		this.setState({ orderForm: updatedOrderForm, formIsValid });
	};
	render() {
		const formElementArray = [];
		for (let key in this.state.orderForm) {
			formElementArray.push({
				id: key,
				config: this.state.orderForm[key],
			});
		}
		let form = (
			<form onSubmit={this.orderHandler}>
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
							changed={(event) =>
								this.inputChnagedHandler(event, formElement.id)
							}
						/>
					);
				})}
				<Button btnType="Success" disabled={!this.state.formIsValid}>
					ORDER
				</Button>
			</form>
		);

		if (this.state.loading) {
			form = <Spinner />;
		}
		return (
			<div className={classes.ContactData}>
				<h4>Enter your contact data</h4>
				{form}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		ings: state.ingredients,
		price: state.totalPrice,
	};
};

export default connect(mapStateToProps)(ContactData);
