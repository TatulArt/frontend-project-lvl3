import makeRequest from './requestMaker';
import parseData from './parser';
import { renderPosts } from '../renderers/validRenderer.js';

const refreshPosts = (currentPostsUrl) => {
  makeRequest(currentPostsUrl)
    .then((response) => {
      const parsedRss = parseData(response.data.contents);
      renderPosts(parsedRss);
    });
};

export default refreshPosts;
