import React from 'react';
import PropTypes from 'prop-types';

import classes from './Input.module.css';

const Input = (props) => {
	let inputElement = null;

	const inputClasses = [classes.InputElement];
	if (props.invalid && props.shouldValidate && props.touched) {
		inputClasses.push(classes.Invalid);
	}

	let validationError = null;
	if (props.invalid && props.touched) {
		validationError = (
			<span className={classes.ValidationError}>
				Please enter a valid value!
			</span>
		);
	}

	switch (props.elementType) {
		case 'input':
			inputElement = (
				<input
					className={inputClasses.join(' ')}
					{...props.elementConfig}
					value={props.value}
					onChange={props.changed}
				/>
			);
			break;
		case 'textarea':
			inputElement = (
				<textarea
					className={inputClasses.join(' ')}
					{...props.elementConfig}
					value={props.value}
					onChange={props.changed}
				/>
			);
			break;
		case 'select':
			inputElement = (
				<select
					className={inputClasses.join(' ')}
					value={props.value}
					onChange={props.changed}
				>
					{props.elementConfig.options.map((option) => {
						return (
							<option key={option.value} value={option.value}>
								{option.displayValue}
							</option>
						);
					})}
				</select>
			);
			break;
		default:
			inputElement = (
				<input
					className={inputClasses.join(' ')}
					{...props.elementConfig}
					value={props.value}
					onChange={props.changed}
				/>
			);
			break;
	}

	return (
		<div className={classes.Input}>
			<label className={classes.Label}>{props.label}</label>
			{inputElement}
			{validationError}
		</div>
	);
};

Input.prototype = {
	elementType: PropTypes.string.isRequired,
	elementConfig: PropTypes.object.isRequired,
	shouldValidate: PropTypes.object.isRequired,
	invalid: PropTypes.bool.isRequired,
	touched: PropTypes.bool.isRequired,
	changed: PropTypes.func.isRequired,
	value: PropTypes.string.isRequired,
};

export default Input;
