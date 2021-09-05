const resetInput = () => {
  const input = document.getElementById('url-input');
  input.classList.remove('is-invalid', 'border', 'border-danger');
  input.value = '';
  input.focus();
};

export const renderPosts = (feeds) => {
  const postsList = document.getElementById('posts-list');
  postsList.innerHTML = '';

  feeds.forEach((feed) => {
    const posts = Array.from(feed.getElementsByTagName('item'));

    posts.forEach((post) => {
      const title = post.getElementsByTagName('title')[0].innerHTML;
      const link = post.getElementsByTagName('link')[0].innerHTML;
      const description = post.getElementsByTagName('description')[0].innerHTML;

      const postElement = document.createElement('li');

      const postLink = document.createElement('a');
      postLink.innerHTML = title;
      postLink.setAttribute('href', link);
      postLink.setAttribute('target', '_blank');
      postLink.classList.add('fw-bold');

      const descriptionElement = document.createElement('p');
      descriptionElement.textContent = description;

      postElement.append(postLink);
      postElement.append(descriptionElement);
      postsList.append(postElement);
    });
  });
};

const renderValid = (feeds) => {
  resetInput();
  renderPosts(feeds);

  const feedsList = document.getElementById('feeds-list');
  feedsList.innerHTML = '';

  feeds.forEach((feed) => {
    const feedElement = document.createElement('li');

    const title = feed.getElementsByTagName('title')[0].innerHTML;
    const titleElement = document.createElement('h3');
    titleElement.textContent = title;

    const description = feed.getElementsByTagName('description')[0].innerHTML;
    const descriptionElement = document.createElement('p');
    descriptionElement.textContent = description;

    feedElement.append(titleElement);
    feedElement.append(descriptionElement);
    feedsList.append(feedElement);
  });
};

export default renderValid;
