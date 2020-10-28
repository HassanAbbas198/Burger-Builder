import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import classes from './Auth.module.css';

import * as actions from '../../store/actions/index';
import { checkValidity } from '../../shared/validation';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';

const Auth = (props) => {
	const [controls, setControls] = useState({
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
	});
	const [isSignup, setIsSignup] = useState(false);

	const { building, authRedirectPath, onSetAuthRedirectPath } = props;

	useEffect(() => {
		if (!building && authRedirectPath !== '/') {
			onSetAuthRedirectPath('/');
		}
	}, [building, authRedirectPath, onSetAuthRedirectPath]);

	const inputChnagedHandler = (event, inputId) => {
		const updatedControls = {
			...controls,
			[inputId]: {
				...controls[inputId],
				value: event.target.value,
				valid: checkValidity(event.target.value, controls[inputId].validation),
				touched: true,
			},
		};
		setControls(updatedControls);
	};

	const submitHandler = (event) => {
		event.preventDefault();

		props.onAuth(controls.email.value, controls.password.value, isSignup);
	};

	const switchAuthModeHandler = () => {
		setIsSignup(!isSignup);
	};

	const formElementArray = [];
	for (let key in controls) {
		formElementArray.push({
			id: key,
			config: controls[key],
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
			changed={(event) => inputChnagedHandler(event, formElement.id)}
		/>
	));

	if (props.loading) {
		form = <Spinner />;
	}

	let errorMessage = null;
	if (props.error) {
		errorMessage = <p style={{ color: 'red' }}>{props.error}</p>;
	}

	let authRedirect = null;
	if (props.isAuth) {
		authRedirect = <Redirect to={props.authRedirectPath} />;
	}

	return (
		<div className={classes.Auth}>
			{authRedirect}
			{errorMessage}
			<form onSubmit={submitHandler}>
				{form}
				<Button btnType="Success">{!isSignup ? 'SIGN IN' : 'SIGN UP'}</Button>
			</form>
			<Button btnType="Danger" clicked={switchAuthModeHandler}>
				SWITCH TO {!isSignup ? 'SIGN UP' : 'SIGN IN'}
			</Button>
		</div>
	);
};

Auth.prototype = {
	loading: PropTypes.bool.isRequired,
	error: PropTypes.string,
	isAuth: PropTypes.bool.isRequired,
	building: PropTypes.bool.isRequired,
	authRedirectPath: PropTypes.string.isRequired,
	onAuth: PropTypes.func.isRequired,
	onSetAuthRedirectPath: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
	return {
		loading: state.auth.loading,
		error: state.auth.error,
		isAuth: state.auth.token !== null,
		building: state.burgerBuilder.building,
		authRedirectPath: state.auth.authRedirectPath,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onAuth: (email, password, isSignup) =>
			dispatch(actions.auth(email, password, isSignup)),

		onSetAuthRedirectPath: (path) =>
			dispatch(actions.setAuthRedirectPath(path)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
