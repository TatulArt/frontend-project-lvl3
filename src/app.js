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
    const inputData = formData.get('url-input');

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
            if (response.data.status.error !== undefined) {
              watchedState.status = 'failed';

              switch (response.data.status.error.name) {
                case 'RequestError':
                  watchedState.feedback = i18next.t('notFoundMessage');
                  break;
                case 'NetworkError':
                  watchedState.feedback = i18next.t('networkErrorMessage');
                  break;
                default:
                  watchedState.feedback = `Unknown error: ${response.data.status.error.name}`;
                  break;
              }

              return;
            }

            watchedState.status = 'loaded';
            watchedState.rssContent.addedUrls.push(inputData);
            watchedState.feedback = i18next.t('successMessage');

            const parsedRss = parseData(response.data.contents);
            watchedState.rssContent.feeds.push(parsedRss);

            const posts = Array.from(parsedRss.getElementsByTagName('item'));
            watchedState.rssContent.posts.existingPosts.push(...posts);
          });
      });
  });

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
