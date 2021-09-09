import i18next from 'i18next';

const renderLists = () => {
  const feedsContainer = document.getElementById('feeds');

  const feedsTitle = document.createElement('h4');
  feedsTitle.textContent = i18next.t('feeds');

  const feedsList = document.createElement('ul');
  feedsList.setAttribute('id', 'feeds-list');
  feedsList.classList.add('list-group');

  feedsContainer.append(feedsTitle);
  feedsContainer.append(feedsList);

  const postsContainer = document.getElementById('posts');

  const postsTitle = document.createElement('h4');
  postsTitle.textContent = i18next.t('posts');

  const postsList = document.createElement('ul');
  postsList.setAttribute('id', 'posts-list');
  postsList.classList.add('list-group');

  postsContainer.append(postsTitle);
  postsContainer.append(postsList);
};

export default renderLists;
