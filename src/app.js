import * as yup from 'yup';
import i18next from 'i18next';
import axios from 'axios';
import parseData from './utilities/parser.js';
import watch from './watch.js';
import validateUrl from './utilities/urlValidator.js';
import resources from './utilities/translatingResources.js';

const app = () => {
  i18next.init({
    lng: 'ru',
    debug: true,
    resources,
  }).then(() => {
    document.title = i18next.t('appName');
    document.getElementById('app-name').innerHTML = i18next.t('appName');
    document.getElementById('app-description').innerHTML = i18next.t('appDescription');
    document.getElementById('url').setAttribute('placeholder', i18next.t('inputPlaceholder'));
    document.getElementById('input-label').innerHTML = i18next.t('inputPlaceholder');
    document.getElementById('main-button').innerHTML = i18next.t('button');
    document.getElementById('example').innerHTML = i18next.t('example');
    document.getElementById('modal-more').innerHTML = i18next.t('modalMore');
    document.getElementById('modal-close').innerHTML = i18next.t('modalClose');
  });

  yup.setLocale({
    string: {
      url: i18next.t('invalidUrlMessage'),
      notOneOf: i18next.t('existingUrlMessage'),
    },
  });

  const watchedState = watch({
    status: '',
    feedback: '',
    rssContent: {
      addedUrls: [],
      feeds: [],
      postsData: {
        posts: [],
        readedPostsLinks: [],
      },
    },
  });

  const startUpdatingPosts = () => {
    setTimeout(() => {
      const responses = watchedState.rssContent.addedUrls.map((url) => axios.get(validateUrl(url))
        .then((response) => ({ result: 'success', response }))
        .catch((error) => ({ result: 'error', error })));

      if (responses.length === 0) {
        startUpdatingPosts();
        return;
      }

      Promise.all(responses)
        .then((responsesArray) => responsesArray.map((responseObject) => {
          if (responseObject.result === 'error') {
            throw new Error(responseObject.error);
          }

          return parseData(responseObject.response.data.contents);
        }))
        .then((allParsedRss) => {
          const addedPostsLinks = watchedState.rssContent.postsData.posts.map((post) => post.link);

          const newPosts = allParsedRss
            .map((parsedRss) => parsedRss.posts)
            .flat()
            .filter((newPost) => {
              const newPostLink = newPost.link;

              if (!addedPostsLinks.includes(newPostLink)) {
                return true;
              }

              return false;
            });

          watchedState.rssContent.postsData.posts.unshift(...newPosts);
          startUpdatingPosts();
        });
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

        axios.get(validateUrl(inputData))
          .then((response) => {
            const { feed, posts } = parseData(response.data.contents);

            watchedState.status = 'loaded';
            watchedState.rssContent.addedUrls.push(inputData);
            watchedState.feedback = i18next.t('successMessage');

            watchedState.rssContent.feeds.push(feed);
            watchedState.rssContent.postsData.posts.push(...posts);
          })
          .catch((error) => {
            watchedState.status = 'failed';

            switch (error.message) {
              case 'Request Error':
                watchedState.feedback = i18next.t('requestErrorMessage');
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
      watchedState.rssContent.postsData.readedPostsLinks.push(readedPostLink.getAttribute('href'));
    }

    if (event.target.classList.contains('post-link')) {
      watchedState.rssContent.postsData.readedPostsLinks.push(event.target.getAttribute('href'));
    }
  });
};

export default app;
