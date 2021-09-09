import i18next from 'i18next';

const renderPosts = (posts) => {
  const postsList = document.getElementById('posts-list');
  postsList.innerHTML = '';

  posts.forEach((post) => {
    const title = post.getElementsByTagName('title')[0].textContent;
    const link = post.getElementsByTagName('link')[0].textContent;
    const description = post.getElementsByTagName('description')[0].textContent;

    const postElement = document.createElement('li');
    postElement.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'border-0', 'px-0');

    const postLink = document.createElement('a');
    postLink.textContent = title;
    postLink.setAttribute('href', link);
    postLink.setAttribute('target', '_blank');
    postLink.classList.add('fw-bold');

    const openModalButton = document.createElement('button');

    openModalButton.addEventListener('click', () => {
      const modalTitle = document.getElementById('modal-title');
      modalTitle.textContent = title;

      const modalDescription = document.getElementById('modal-description');
      modalDescription.textContent = description;

      const modalLink = document.getElementById('modal-more');
      modalLink.setAttribute('href', link);
    });

    openModalButton.textContent = i18next.t('descriptionBtn');
    openModalButton.classList.add('btn', 'btn-outline-primary', 'btn-sm', 'modal-button');
    openModalButton.setAttribute('data-bs-toggle', 'modal');
    openModalButton.setAttribute('data-bs-target', '#modal');

    postElement.append(postLink);
    postElement.append(openModalButton);
    postsList.append(postElement);
  });
};

export default renderPosts;
