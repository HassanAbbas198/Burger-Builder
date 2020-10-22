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

const fetchOrdersSuccess = (orders) => {
	return {
		type: actionTypes.FETCH_ORDERS_SUCCESS,
		orders,
	};
};

const fetchOrdersFail = (error) => {
	return {
		type: actionTypes.FETCH_ORDERS_FAIL,
		error,
	};
};

const fetchOrdersStart = () => {
	return {
		type: actionTypes.FETCH_ORDERS_START,
	};
};

export const fetchOrders = () => {
	return async (dispatch) => {
		try {
			dispatch(fetchOrdersStart());

			const res = await axios.get('/orders.json');

			const fetchedOrders = [];
			for (let key in res.data) {
				fetchedOrders.push({
					id: key,
					...res.data[key],
				});
			}
			dispatch(fetchOrdersSuccess(fetchedOrders));
		} catch (error) {
			dispatch(fetchOrdersFail(error));
		}
	};
};
