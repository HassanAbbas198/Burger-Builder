import React from 'react';

import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const Burger = (props) => {
	const transformedIngredients = Object.keys(props.ingredients).map((igKey) => {
		return [...Array(props.ingredients[igKey])].map((_, i) => {
			return <BurgerIngredient key={igKey + i} type={igKey} />;
		});
	});

	let reducedIngredients = transformedIngredients.reduce((arr, el) => {
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

export default Burger;
