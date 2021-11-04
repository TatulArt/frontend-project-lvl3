import i18next from 'i18next';

const renderFeeds = (feeds) => {
  const feedsList = document.getElementById('feeds-list');
  feedsList.innerHTML = '';

  feeds.forEach((feed) => {
    const feedElement = document.createElement('li');
    feedElement.classList.add('list-group-item', 'border-0', 'px-0');

    const titleElement = document.createElement('h5');
    titleElement.textContent = feed.title;

    const descriptionElement = document.createElement('p');
    descriptionElement.textContent = feed.description;

    feedElement.append(titleElement);
    feedElement.append(descriptionElement);
    feedsList.append(feedElement);
  });
};

const renderPosts = (posts, readedPostsLinks) => {
  const postsList = document.getElementById('posts-list');
  postsList.innerHTML = '';

  posts.forEach((post) => {
    const postElement = document.createElement('li');
    postElement.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'border-0', 'px-0');

    const postLink = document.createElement('a');
    postLink.textContent = post.title;
    postLink.setAttribute('href', post.link);
    postLink.setAttribute('target', '_blank');
    postLink.classList.add('post-link');

    if (readedPostsLinks.includes(post.link)) {
      postLink.classList.add('fw-normal');
      postLink.classList.add('text-secondary');
    } else {
      postLink.classList.add('fw-bold');
    }

    const openModalButton = document.createElement('button');

    openModalButton.addEventListener('click', () => {
      const modalTitle = document.getElementById('modal-title');
      modalTitle.textContent = post.title;

      const modalDescription = document.getElementById('modal-description');
      modalDescription.textContent = post.description;

      const modalLink = document.getElementById('modal-more');
      modalLink.setAttribute('href', post.link);
    });

    openModalButton.textContent = i18next.t('openModalBtn');
    openModalButton.classList.add('btn', 'btn-outline-primary', 'btn-sm', 'modal-button');
    openModalButton.setAttribute('data-bs-toggle', 'modal');
    openModalButton.setAttribute('data-bs-target', '#modal');

    postElement.append(postLink);
    postElement.append(openModalButton);
    postsList.append(postElement);
  });
};

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

const renderInvalid = () => {
  const input = document.getElementById('url');
  input.classList.add('is-invalid', 'border', 'border-danger');
};

const renderFeedback = (feedbackMessage, status) => {
  const messagePlaceholder = document.getElementById('feedback-message');
  if (status === 'loaded') {
    messagePlaceholder.classList.remove('text-danger');
    messagePlaceholder.classList.add('text-success');
  } else {
    messagePlaceholder.classList.add('text-danger');
    messagePlaceholder.classList.remove('text-success');
  }

  messagePlaceholder.innerHTML = feedbackMessage;
};

const blockForm = () => {
  const input = document.getElementById('url');
  input.setAttribute('readonly', '');

  const button = document.getElementById('main-button');
  button.disabled = true;
};

const unblockForm = () => {
  const input = document.getElementById('url');
  input.removeAttribute('readonly');

  const button = document.getElementById('main-button');
  button.disabled = false;
};

const markReadedLinks = (readedLinks) => {
  const allLinksElements = Array.from(document.getElementsByClassName('post-link'));
  const allLinks = allLinksElements.map((linkElement) => linkElement.getAttribute('href'));

  const readedLinksIndexes = readedLinks.map((link) => allLinks.indexOf(link));
  readedLinksIndexes.forEach((readedLinkIndex) => {
    const readedLinkElement = allLinksElements[readedLinkIndex];

    readedLinkElement.classList.remove('fw-bold');
    readedLinkElement.classList.add('fw-normal');
    readedLinkElement.classList.add('text-secondary');
  });
};

export default {
  blockForm,
  unblockForm,
  renderInvalid,
  renderFeedback,
  renderLists,
  renderFeeds,
  renderPosts,
  markReadedLinks,
};
