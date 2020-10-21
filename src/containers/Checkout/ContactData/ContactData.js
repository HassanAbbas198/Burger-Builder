import React, { Component } from 'react';
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
			},

			street: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Your Street ',
				},
				value: '',
			},
			zipCode: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'ZIP Code ',
				},
				value: '',
			},
			country: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Your Country ',
				},
				value: '',
			},

			email: {
				elementType: 'input',
				elementConfig: {
					type: 'email',
					placeholder: 'Your E-mail',
				},
				value: '',
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
			},
		},
		loading: false,
	};

	orderHandler = async (event) => {
		event.preventDefault();
		this.setState({ loading: true });

		const formData = {};
		for (let FormElementId in this.state.orderForm) {
			formData[FormElementId] = this.state.orderForm[FormElementId].value;
		}

		const order = {
			ingredients: this.props.ingredients,
			price: this.props.price,
			orderData: formData,
		};
		await axios.post('/orders.json', order);
		this.setState({ loading: false });
		this.props.history.push('/');
	};

	inputChnagedHandler = (event, inputId) => {
		// this doesn't create a deep clone
		const updatedOrderForm = { ...this.state.orderForm };

		// copies the properties inside my selected orderForm element deeply
		const updatedFormElement = {
			...updatedOrderForm[inputId],
		};

		updatedFormElement.value = event.target.value;

		this.setState({ orderForm: updatedOrderForm });
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
							changed={(event) =>
								this.inputChnagedHandler(event, formElement.id)
							}
						/>
					);
				})}
				<Button btnType="Success" clicked={this.orderHandler}>
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

export default ContactData;
