import axios from '../../axios-orders';
import * as actionTypes from './actionTypes';

const authStart = () => {
	return {
		type: actionTypes.AUTH_START,
	};
};

const authSuccess = (authData) => {
	return {
		type: actionTypes.AUTH_SUCCESS,
		authData,
	};
};

const authFail = (error) => {
	return {
		type: actionTypes.AUTH_SUCCESS,
		error,
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

			dispatch(authSuccess(res.data.idToken, res.data.localId));
		} catch (error) {
			dispatch(authFail(error.response.data.error));
		}
	};
};
