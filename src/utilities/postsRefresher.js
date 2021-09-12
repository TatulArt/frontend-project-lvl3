import makeRequest from './requestMaker';
import parseData from './parser';
import renderPosts from '../renderers/listsContentRenderers/postsRenderer.js';

const refreshPosts = (urls, existingPosts, readedPostsLinks) => {
  const responses = urls.map((url) => makeRequest(url));
  const responsesArray = Promise.all(responses);

  responsesArray
    .then((arrayContent) => arrayContent.map((response) => parseData(response.data.contents)))
    .then((allParsedRss) => {
      const freshPosts = allParsedRss.map((parsedRss) => Array.from(parsedRss.getElementsByTagName('item'))).flat();

      const freshPostsContent = freshPosts.map((post) => post.innerHTML);
      const existingPostsContent = existingPosts.map((post) => post.innerHTML);

      const newPosts = freshPostsContent
        .filter((postContent) => !existingPostsContent.includes(postContent))
        .map((newPostContent) => freshPosts[freshPostsContent.indexOf(newPostContent)]);

      renderPosts([...newPosts, ...existingPosts], readedPostsLinks);
    });
};

export default refreshPosts;
