const parseData = (data) => {
  const parser = new DOMParser();
  return parser.parseFromString(String(data), 'text/xml');
};

export default parseData;
