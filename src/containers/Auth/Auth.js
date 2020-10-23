import React, { Component } from 'react';

import classes from './Auth.module.css';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';

class Auth extends Component {
	state = {
		controls: {
			email: {
				elementType: 'input',
				elementConfig: {
					type: 'email',
					placeholder: 'Your E-Mail address..',
				},
				value: '',
				validation: {
					required: true,
					isEmail: true,
				},
				valid: false,
				touched: false,
			},

			password: {
				elementType: 'input',
				elementConfig: {
					type: 'password',
					placeholder: 'Your Password..',
				},
				value: '',
				validation: {
					required: true,
					minLength: 6,
				},
				valid: false,
				touched: false,
			},
		},
	};

	checkValidity = (value, rules) => {
		let isValid = true;

		if (rules.required) {
			isValid = value.trim() !== '' && isValid;
		}

		return isValid;
	};

	inputChnagedHandler = (event, inputId) => {
		const updatedControls = {
			...this.state.controls,
			[inputId]: {
				...this.state.controls[inputId],
				value: event.target.value,
				valid: this.checkValidity(
					event.target.value,
					this.state.controls[inputId].validation
				),
				touched: true,
			},
		};

		this.setState({ controls: updatedControls });
	};

	render() {
		const formElementArray = [];
		for (let key in this.state.controls) {
			formElementArray.push({
				id: key,
				config: this.state.controls[key],
			});
		}

		let form = formElementArray.map((formElement) => (
			<Input
				key={formElement.id}
				elementType={formElement.config.elementType}
				elementConfig={formElement.config.elementConfig}
				value={formElement.config.value}
				invalid={!formElement.config.valid}
				shouldValidate={formElement.config.validation}
				touched={formElement.config.touched}
				changed={(event) => this.inputChnagedHandler(event, formElement.id)}
			/>
		));

		if (this.props.loading) {
			form = <Spinner />;
		}

		return (
			<div className={classes.Auth}>
				<form onSubmit={this.submitHandler}>
					{form}
					<Button btnType="Success" clicked={this.authHandler}>
						{this.state.isSignup ? 'SIGN UP' : 'SIGN IN'}
					</Button>
				</form>
				<Button btnType="Danger" clicked={this.switchAuthModeHandler}>
					SWITCH TO {this.state.isSignup ? 'SIGNIN' : 'SIGN UP'}
				</Button>
			</div>
		);
	}
}

export default Auth;
