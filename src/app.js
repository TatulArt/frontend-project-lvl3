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
        newPosts: [],
        readedPostsLinks: [],
      },
    },
  });

  const startUpdatingPosts = () => {
    setTimeout(() => {
      if (watchedState.rssContent.addedUrls.length === 0) {
        startUpdatingPosts();
        return;
      }

      const responses = watchedState.rssContent.addedUrls.map((url) => makeRequest(url));
      Promise.all(responses)
        .then((arrayContent) => arrayContent.map((response) => parseData(response.data.contents)))
        .then((allParsedRss) => {
          const newPosts = allParsedRss.map((parsedRss) => parsedRss.posts).flat();
          watchedState.rssContent.posts.newPosts = newPosts;
        });

      startUpdatingPosts();
    }, 5000);
  };

  startUpdatingPosts();

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
            const { feed, posts } = parseData(response.data.contents);

            if (feed.contains(feed.getElementsByTagName('parsererror')[0])) {
              throw new Error('Request Error');
            }

            watchedState.status = 'loaded';
            watchedState.rssContent.addedUrls.push(inputData);
            watchedState.feedback = i18next.t('successMessage');

            watchedState.rssContent.feeds.push(feed);
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
