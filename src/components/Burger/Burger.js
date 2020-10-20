import React from 'react';

import classes from './Burger.module.css';

import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
	// this will return an array of arrays
	const transformedIngredients = Object.keys(props.ingredients).map((igKey) => {
		return [...Array(props.ingredients[igKey])].map((_, i) => {
			return <BurgerIngredient key={igKey + i} type={igKey} />;
		});
	});

	// pulling out the values of inner arrays and store it in 1 array that contains these values
	let reducedIngredients = transformedIngredients.reduce((arr, el) => {
		// loop through the elements and add them to the initial value '[]'
		return arr.concat(el);
	}, []);

	if (reducedIngredients.length <= 0) {
		reducedIngredients = <p>Please add ingredients!</p>;
	}
	return (
		<div className={classes.Burger}>
			<BurgerIngredient type="bread-top" />
			{reducedIngredients}
			<BurgerIngredient type="bread-bottom" />
		</div>
	);
};

export default burger;
