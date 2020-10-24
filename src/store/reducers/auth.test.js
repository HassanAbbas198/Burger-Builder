import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

describe('Auth reducer', () => {
	it('should return the initial state', () => {
		expect(reducer(undefined, {})).toEqual({
			token: null,
			userId: null,
			error: null,
			loading: false,
			authRedirectPath: '/',
		});
	});

	it('should store the token upon login', () => {
		expect(
			reducer(
				{
					token: null,
					userId: null,
					error: null,
					loading: false,
					authRedirectPath: '/',
				},
				{
					type: actionTypes.AUTH_SUCCESS,
					idToken: 'random-token',
					userId: 'random-userid',
				}
			)
		).toEqual({
			token: 'random-token',
			userId: 'random-userid',
			error: null,
			loading: false,
			authRedirectPath: '/',
		});
	});
});
