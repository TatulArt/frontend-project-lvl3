const renderFeeds = (feeds) => {
  feeds.forEach((feed) => {
    const feedsList = document.getElementById('feeds-list');
    feedsList.innerHTML = '';

    const feedElement = document.createElement('li');
    feedElement.classList.add('list-group-item', 'border-0', 'px-0');

    const title = feed.getElementsByTagName('title')[0].textContent;
    const titleElement = document.createElement('h5');
    titleElement.textContent = title;

    const description = feed.getElementsByTagName('description')[0].textContent;
    const descriptionElement = document.createElement('p');
    descriptionElement.textContent = description;

    feedElement.append(titleElement);
    feedElement.append(descriptionElement);
    feedsList.append(feedElement);
  });
};

export default renderFeeds;
