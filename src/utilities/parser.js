const parseData = (data) => {
  const parser = new DOMParser();

  const feedData = parser.parseFromString(String(data), 'text/xml');

  if (feedData.contains(feedData.getElementsByTagName('parsererror')[0])) {
    throw new Error('Request Error');
  }

  const feed = {
    title: feedData.getElementsByTagName('title')[0].textContent,
    description: feedData.getElementsByTagName('description')[0].textContent,
  };

  const posts = Array.from(feedData.getElementsByTagName('item'))
    .flat()
    .map((post) => {
      const title = post.getElementsByTagName('title')[0].textContent;
      const link = post.getElementsByTagName('link')[0].textContent;
      const description = post.getElementsByTagName('description')[0].textContent;

      const postObject = {
        title,
        link,
        description,
      };

      return postObject;
    });

  return { feed, posts };
};

export default parseData;
