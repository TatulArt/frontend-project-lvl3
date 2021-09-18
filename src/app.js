import * as yup from 'yup';
import i18next from 'i18next';
import parseData from './utilities/parser.js';
import watch from './watch.js';
import makeRequest from './utilities/requestMaker.js';
import translatePage from './utilities/translator.js';

const app = () => {
  translatePage('ru');

  const watchedState = watch({
    status: '',
    feedback: '',
    rssContent: {
      addedUrls: [],
      feeds: [],
      posts: {
        existingPosts: [],
        readedPostsLinks: [],
      },
    },
  });

  const form = document.getElementById('form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const inputData = formData.get('url');

    const validationSchema = yup
      .string()
      .url()
      .notOneOf(watchedState.rssContent.addedUrls);

    validationSchema
      .isValid(inputData)
      .then((isValid) => {
        watchedState.status = 'loading';

        if (!isValid) {
          watchedState.status = 'failed';
          watchedState.feedback = watchedState.rssContent.addedUrls.indexOf(inputData) !== -1 ? i18next.t('existingUrlMessage') : i18next.t('invalidUrlMessage');
          return;
        }

        makeRequest(inputData)
          .then((response) => {
            const parsedData = parseData(response.data.contents);
            if (parsedData.contains(parsedData.getElementsByTagName('parsererror')[0])) {
              throw new Error('Request Error');
            }

            watchedState.status = 'loaded';
            watchedState.rssContent.addedUrls.push(inputData);
            watchedState.feedback = i18next.t('successMessage');

            watchedState.rssContent.feeds.push(parsedData);

            const posts = Array.from(parsedData.getElementsByTagName('item')).flat();
            watchedState.rssContent.posts.existingPosts.push(...posts);
          })
          .catch((error) => {
            watchedState.status = 'failed';

            switch (error.message) {
              case 'Request Error':
                watchedState.feedback = i18next.t('notFoundMessage');
                break;
              case 'Network Error':
                watchedState.feedback = i18next.t('networkErrorMessage');
                break;
              default:
                watchedState.feedback = error.message;
            }
          });
      });
  });

  const startUpdateingPosts = () => {
    setTimeout(() => {
      if (watchedState.rssContent.addedUrls.length === 0) {
        startUpdateingPosts();
        return;
      }

      const responses = watchedState.rssContent.addedUrls.map((url) => makeRequest(url));

      Promise.all(responses)
        .then((arrayContent) => arrayContent.map((response) => parseData(response.data.contents)))
        .then((allParsedRss) => {
          const freshPosts = allParsedRss.map((parsedRss) => Array.from(parsedRss.getElementsByTagName('item'))).flat();
          const freshPostsContent = freshPosts.map((post) => post.innerHTML);

          // eslint-disable-next-line max-len
          const existingPostsContent = watchedState.rssContent.posts.existingPosts.map((post) => post); // здесь все сыпится потому что тип post - это Proxy

          console.log(existingPostsContent);
          const newPosts = freshPostsContent
            .filter((postContent) => !existingPostsContent.includes(postContent))
            .map((newPostContent) => freshPosts[freshPostsContent.indexOf(newPostContent)]);

          // console.log(newPosts);
          watchedState.rssContent.posts.existingPosts.push(...newPosts);
        });

      startUpdateingPosts();
    }, 5000);
  };

  startUpdateingPosts();

  const postsContainer = document.getElementById('posts');

  postsContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('modal-button')) {
      const readedPostLink = document.getElementById('modal-more');
      watchedState.rssContent.posts.readedPostsLinks.push(readedPostLink.getAttribute('href'));
    }

    if (event.target.classList.contains('post-link')) {
      watchedState.rssContent.posts.readedPostsLinks.push(event.target.getAttribute('href'));
    }
  });
};

export default app;
