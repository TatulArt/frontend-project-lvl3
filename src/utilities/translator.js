import i18next from 'i18next';
import * as yup from 'yup';

const translatePage = (lng) => {
  i18next.init({
    lng,
    debug: true,
    resources: {
      ru: {
        translation: {
          appName: 'RSS агрегатор',
          appDescription: 'Начните читать RSS сегодня! Это легко, это красиво.',
          inputPlaceholder: 'Ссылка RSS',
          button: 'Добавить',
          example: 'Пример: https://ru.hexlet.io/lessons.rss',
          successMessage: 'RSS успешно загружен',
          invalidUrlMessage: 'Ссылка должна быть валидным URL',
          existingUrlMessage: 'RSS уже существует',
          notFoundMessage: 'Ресурс не содержит валидный RSS',
        },
      },
      en: {
        translation: {
          appName: 'RSS agregator',
          appDescription: 'Start reading RSS today! It\'s easy, it\'s beautiful.',
          inputPlaceholder: 'RSS link',
          button: 'Add',
          example: 'Example: https://ru.hexlet.io/lessons.rss',
          successMessage: 'RSS succesfuly processed',
          invalidUrlMessage: 'Link must be valid URL',
          existingUrlMessage: 'RSS already existing',
          notFoundMessage: 'Resource does not contain valid RSS',
        },
      },
    },
  }).then(() => {
    document.title = i18next.t('appName');
    document.getElementById('app-name').innerHTML = i18next.t('appName');
    document.getElementById('app-description').innerHTML = i18next.t('appDescription');
    document.getElementById('url-input').setAttribute('placeholder', i18next.t('inputPlaceholder'));
    document.getElementById('input-label').innerHTML = i18next.t('inputPlaceholder');
    document.getElementById('main-button').innerHTML = i18next.t('button');
    document.getElementById('example').innerHTML = i18next.t('example');
  });

  yup.setLocale({
    string: {
      url: i18next.t('invalidUrlMessage'),
      notOneOf: i18next.t('existingUrlMessage'),
    },
  });
};

export default translatePage;
