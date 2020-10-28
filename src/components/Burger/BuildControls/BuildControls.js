import React from 'react';
import PropTypes from 'prop-types';

import classes from './BuildControls.module.css';

import BuildControl from './BuildControl/BuildControl';

const controls = [
	{ label: 'Bacon', type: 'bacon' },
	{ label: 'Meat', type: 'meat' },
	{ label: 'Salad', type: 'salad' },
	{ label: 'Cheese', type: 'cheese' },
];

const BuildControls = (props) => {
	return (
		<div className={classes.BuildControls}>
			<p>
				Current Price: <strong>${props.price.toFixed(2)} </strong>
			</p>
			{controls.map((ctrl) => (
				<BuildControl
					key={ctrl.label}
					label={ctrl.label}
					added={() => props.ingredientAdded(ctrl.type)}
					removed={() => props.ingredientRemoved(ctrl.type)}
					disabled={props.disabled[ctrl.type]}
				/>
			))}
			<button
				className={classes.OrderButton}
				disabled={!props.purchasable}
				onClick={props.ordered}
			>
				{props.isAuth ? 'ORDER NOW' : 'SIGN IN TO ORDER'}
			</button>
		</div>
	);
};

BuildControls.propTypes = {
	price: PropTypes.number.isRequired,
	purchasable: PropTypes.bool.isRequired,
	disabled: PropTypes.object.isRequired,
	isAuth: PropTypes.bool.isRequired,
	ingredientAdded: PropTypes.func.isRequired,
	ingredientRemoved: PropTypes.func.isRequired,
	ordered: PropTypes.func.isRequired,
};

export default BuildControls;
