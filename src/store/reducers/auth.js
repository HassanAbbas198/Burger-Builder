import * as actionTypes from '../actions/actionTypes';

const initialState = {
	token: null,
	userId: null,
	error: null,
	loading: false,
	authRedirectPath: '/',
};
const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.AUTH_START:
			return {
				...state,
				loading: true,
				error: null,
			};

		case actionTypes.AUTH_SUCCESS:
			return {
				...state,
				token: action.idToken,
				userId: action.userId,
				loading: false,
				error: null,
			};

		case actionTypes.AUTH_FAIL:
			let error = null;
			if (action.error.message === 'EMAIL_EXISTS') {
				error = 'Email already exists';
			}

			if (action.error.message === 'EMAIL_NOT_FOUND') {
				error = 'Email not found';
			}

			if (action.error.message === 'INVALID_PASSWORD') {
				error = 'Invalid password';
			}

			return {
				...state,
				loading: false,
				error,
			};

		case actionTypes.AUTH_LOGOUT:
			return {
				...state,
				token: null,
				userId: null,
			};

		case actionTypes.SET_AUTH_REDIRECT_PATH:
			return {
				...state,
				authRedirectPath: action.path,
			};
		default:
			return state;
	}
};

export default reducer;
