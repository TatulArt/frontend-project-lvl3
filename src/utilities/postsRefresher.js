import makeRequest from './requestMaker';
import parseData from './parser';
import { renderPosts } from '../renderers/validRenderer.js';

const refreshPosts = (urls) => {
  const responses = urls.map((url) => makeRequest(url));
  const responsesArray = Promise.all(responses);

  responsesArray
    .then((arrayContent) => arrayContent.map((response) => parseData(response.data.contents)))
    .then((allParsedRss) => renderPosts(allParsedRss));
};

export default refreshPosts;
