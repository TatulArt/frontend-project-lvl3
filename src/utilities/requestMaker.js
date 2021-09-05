import axios from 'axios';

const makeRequest = (url) => axios.get(`https://hexlet-allorigins.herokuapp.com/get?disableCache=true&url=${encodeURIComponent(url)}`).then((response) => response);

export default makeRequest;
