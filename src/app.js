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
    rssFeeds: {
      addedUrls: [],
      parsedFeeds: [],
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
      .notOneOf(watchedState.rssFeeds.addedUrls);

    validationSchema
      .isValid(inputData)
      .then((isValid) => {
        watchedState.status = 'loading';

        if (!isValid) {
          watchedState.status = 'failed';
          watchedState.feedback = watchedState.rssFeeds.addedUrls.indexOf(inputData) !== -1 ? i18next.t('existingUrlMessage') : i18next.t('invalidUrlMessage');
          return;
        }

        makeRequest(inputData)
          .then((response) => {
            if (response.data.status.error !== undefined) {
              watchedState.status = 'failed';
              watchedState.feedback = i18next.t('notFoundMessage');
              return;
            }

            const parsedRss = parseData(response.data.contents);
            watchedState.rssFeeds.parsedFeeds.push(parsedRss);
            watchedState.rssFeeds.addedUrls.push(inputData);

            watchedState.status = 'loaded';
            watchedState.feedback = i18next.t('successMessage');
          });
      });
  });
};

export default app;
