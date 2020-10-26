import React, { Suspense, useEffect } from 'react';
import {
	BrowserRouter as Router,
	Redirect,
	Route,
	Switch,
} from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from './store/actions/index';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './containers/Auth/Logout/Logout';

const asyncCheckout = React.lazy(() =>
	import('./containers/Checkout/Checkout')
);
const asyncOrders = React.lazy(() => import('./containers/Orders/Orders'));
const asyncAuth = React.lazy(() => import('./containers/Auth/Auth'));

const App = (props) => {
	const { onTryAutoSignup } = props;

	useEffect(() => {
		onTryAutoSignup();
	}, [onTryAutoSignup]);

	let routes = (
		<Switch>
			<Suspense fallback={<div>Loading...</div>}>
				<Route path="/auth" component={asyncAuth} />
				<Route path="/" exact component={BurgerBuilder} />
				<Redirect to="/" />
			</Suspense>
		</Switch>
	);

	if (props.isAuth) {
		routes = (
			<Switch>
				<Suspense fallback={<div>Loading...</div>}>
					<Route path="/checkout" component={asyncCheckout} />
					<Route path="/orders" component={asyncOrders} />
					<Route path="/auth" component={asyncAuth} />
					<Route path="/logout" component={Logout} />
					<Route path="/" exact component={BurgerBuilder} />
					<Redirect to="/" />
				</Suspense>
			</Switch>
		);
	}
	return (
		<Router>
			<div>
				<Layout>{routes}</Layout>
			</div>
		</Router>
	);
};

const mapStateToProps = (state) => {
	return {
		isAuth: state.auth.token !== null,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onTryAutoSignup: () => dispatch(actions.authCheckState()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
