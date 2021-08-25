import onChange from 'on-change';
import * as yup from 'yup';
import i18next from 'i18next';
import textResources from './textResources';
import renderFeeds from './renderFeeds.js';

const app = () => {
  const state = {
    rssFeeds: [],
  };

  const watchedState = onChange(state, (path, value) => {
    if (path === 'rssFeeds') {
      renderFeeds(value);
    }
  });

  i18next.init({
    lng: 'ru',
    debug: true,
    resources: textResources,
  }).then(() => {
    document.getElementById('app-name').innerHTML = i18next.t('appName');
    document.getElementById('app-description').innerHTML = i18next.t('appDescription');
    document.getElementById('url-input').setAttribute('placeholder', i18next.t('inputPlaceholder'));
    document.getElementById('main-button').innerHTML = i18next.t('button');
    document.getElementById('example').innerHTML = i18next.t('example');
  });

  const form = document.getElementById('form');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const inputData = formData.get('url-input');

    const validationSchema = yup.string().url().notOneOf(watchedState.rssFeeds);

    validationSchema
      .isValid(inputData)
      .then((isValid) => {
        watchedState.isValid = isValid;

        if (isValid) {
          watchedState.rssFeeds.push(inputData);
        } else {
          watchedState.error = watchedState.rssFeeds.indexOf(inputData) !== -1 ? `Already existing RSS feed: '${inputData}'!` : `Invalid RSS feed: '${inputData}'!`;
        }
      });
  });
};

export default app;
