import axios from '../../axios-orders';
import * as actionTypes from './actionTypes';

const authStart = () => {
	return {
		type: actionTypes.AUTH_START,
	};
};

const authSuccess = (token, userId) => {
	return {
		type: actionTypes.AUTH_SUCCESS,
		idToken: token,
		userId,
	};
};

const authFail = (error) => {
	return {
		type: actionTypes.AUTH_FAIL,
		error,
	};
};

export const logout = () => {
	localStorage.removeItem('token');
	localStorage.removeItem('expirationDate');
	localStorage.removeItem('userId');
	return {
		type: actionTypes.AUTH_LOGOUT,
	};
};

const checkAuthTimeout = (expirationTime) => {
	return (dispatch) => {
		setTimeout(() => {
			dispatch(logout());
		}, expirationTime * 1000);
	};
};

export const auth = (email, password, isSignup) => {
	const authData = {
		email,
		password,
		returnSecureToken: true,
	};

	let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDKzJJbNnjP-AQ0Ca4x-ofOC_X6uSne9F8`;

	if (!isSignup) {
		url =
			'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDKzJJbNnjP-AQ0Ca4x-ofOC_X6uSne9F8';
	}

	return async (dispatch) => {
		try {
			dispatch(authStart());

			const res = await axios.post(url, authData);

			const expirationDate = new Date(
				new Date().getTime() + res.data.expiresIn * 1000
			);

			localStorage.setItem('token', res.data.idToken);
			localStorage.setItem('userId', res.data.localId);
			localStorage.setItem('expirationDate', expirationDate);

			dispatch(authSuccess(res.data.idToken, res.data.localId));
			dispatch(checkAuthTimeout(res.data.expiresIn));
		} catch (error) {
			dispatch(authFail(error.response.data.error));
		}
	};
};

export const setAuthRedirectPath = (path) => {
	return {
		type: actionTypes.SET_AUTH_REDIRECT_PATH,
		path,
	};
};
