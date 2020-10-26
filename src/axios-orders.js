import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://burger-builder-df506.firebaseio.com/',
});

export default instance;
