import React, { Component } from 'react';
import axios from '../../../axios-orders';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {
	state = {
		name: '',
		email: '',
		address: {
			street: '',
			postalCode: '',
		},
		loading: false,
	};

	orderHandler = async (event) => {
		event.preventDefault();

		this.setState({ loading: true });

		const order = {
			ingredients: this.props.ingredients,
			price: this.props.price,
			customer: {
				name: 'hassan abbas',
				address: {
					street: 'habla',
					country: 'Lebanon',
				},
				email: 'test@test.com',
			},
			deliveryMethod: 'fastest',
		};

		try {
			await axios.post('/orders.json', order);
			this.setState({ loading: false });
			this.props.history.push('/');
		} catch (error) {
			this.setState({ loading: false });
		}
	};

	render() {
		let form = (
			<form>
				<input type="text" name="name" placeholder="your name" />
				<input type="text" name="email" placeholder="your email" />
				<input type="street" name="street" placeholder="your street" />
				<input type="postal" name="postal" placeholder="your postal" />
				<Button btnType="Success" clicked={this.orderHandler}>
					ORDER
				</Button>
			</form>
		);

		if (this.state.loading) {
			form = <Spinner />;
		}
		return (
			<div>
				<h4>Enter your contact data:</h4>
				{form}
			</div>
		);
	}
}

export default ContactData;
