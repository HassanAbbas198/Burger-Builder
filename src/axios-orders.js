import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://something-979e6.firebaseio.com/',
});

export default instance;
