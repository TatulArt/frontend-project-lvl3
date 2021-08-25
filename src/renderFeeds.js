const renderFeeds = (feeds) => {
  const feedsCotainer = document.getElementById('rss-feeds');
  feedsCotainer.innerHTML = '';

  feeds.forEach((feed) => {
    const feedHref = document.createElement('p');
    feedHref.append(document.createTextNode(feed));

    feedsCotainer.append(feedHref);
  });
};

export default renderFeeds;
