const parseData = (data) => {
  const parser = new DOMParser();

  const feed = parser.parseFromString(String(data), 'text/xml');
  const posts = Array.from(feed.getElementsByTagName('item')).flat();

  return { feed, posts };
};

export default parseData;
