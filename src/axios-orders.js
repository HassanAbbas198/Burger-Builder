import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://burger-builder-9e60b.firebaseio.com/',
});

export default instance;
