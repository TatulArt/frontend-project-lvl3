import axios from 'axios';

const makeRequest = (url) => axios.get(`https://hexlet-allorigins.herokuapp.com/get?disableCache=true&url=${encodeURIComponent(url)}`);

export default makeRequest;
