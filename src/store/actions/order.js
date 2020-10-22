import axios from '../../axios-orders';
import * as actionTypes from './actionTypes';

const purchaseBurgerSuccess = (id, orderData) => {
	return {
		type: actionTypes.PURCHASE_BURGER_SUCCESS,
		orderId: id,
		orderData,
	};
};

const purchaseBurgerFail = (error) => {
	return {
		type: actionTypes.PURCHASE_BURGER_FAIL,
		error,
	};
};

const purchaseBurgerStart = () => {
	return {
		type: actionTypes.PURCHASE_BURGER_START,
	};
};

export const purchaseBurger = (orderData) => {
	return async (dispatch) => {
		try {
			dispatch(purchaseBurgerStart());
			const res = await axios.post('/orders.json', orderData);
			dispatch(purchaseBurgerSuccess(res.data.name, orderData));
		} catch (error) {
			dispatch(purchaseBurgerFail(error));
		}
	};
};

export const purchaseInit = () => {
	return {
		type: actionTypes.PURCHASE_INIT,
	};
};
