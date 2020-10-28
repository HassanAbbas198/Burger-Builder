import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';

import * as actions from '../../store/actions/index';

const Orders = (props) => {
	const { onFetchOrders, token, userId } = props;

	useEffect(() => {
		onFetchOrders(token, userId);
	}, [onFetchOrders, token, userId]);

	let orders = <Spinner />;

	if (!props.loading) {
		orders = props.orders.map((order) => {
			return (
				<Order
					key={order.id}
					ingredients={order.ingredients}
					price={+order.price}
				/>
			);
		});
	}
	return <div>{orders}</div>;
};

Orders.prototype = {
	orders: PropTypes.array.isRequired,
	loading: PropTypes.bool.isRequired,
	token: PropTypes.string.isRequired,
	userId: PropTypes.string.isRequired,
	onFetchOrders: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
	return {
		orders: state.order.orders,
		loading: state.order.loading,
		token: state.auth.token,
		userId: state.auth.userId,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onFetchOrders: (token, userId) =>
			dispatch(actions.fetchOrders(token, userId)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withErrorHandler(Orders, axios));
