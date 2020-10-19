import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
// import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {
	state = {
		name: '',
		email: '',
		address: {
			street: '',
			postalCode: '',
		},
	};

	render() {
		return (
			<div>
				<h4>Enter your contact data:</h4>
				<form>
					<input type="text" name="name" placeholder="your name" />
					<input type="text" name="email" placeholder="your email" />
					<input type="street" name="street" placeholder="your street" />
					<input type="postal" name="postal" placeholder="your postal" />
					<Button btnType="Success" clicked={this.orderHandler}>
						ORDER
					</Button>
				</form>
			</div>
		);
	}
}

export default ContactData;
