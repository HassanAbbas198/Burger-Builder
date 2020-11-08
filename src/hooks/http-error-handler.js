import { useState, useEffect } from 'react';

export default (axios) => {
	const [error, setError] = useState(null);

	const reqInterceptor = axios.interceptors.request.use((req) => {
		setError(null);
		return req;
	});

	const resInterceptor = axios.interceptors.response.use(
		(res) => res,
		(err) => {
			const fallbackValue = [{ title: err, completed: false }];
			setError(fallbackValue[0].title);
		}
	);

	// componentWillUnmount alternative
	useEffect(() => {
		return () => {
			axios.interceptors.request.eject(reqInterceptor);
			axios.interceptors.response.eject(resInterceptor);
		};
	}, [reqInterceptor, resInterceptor, axios]);

	const errorConfirmedHandler = () => {
		setError(null);
	};

	return [error, errorConfirmedHandler];
};
