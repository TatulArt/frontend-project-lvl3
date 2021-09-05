const parseData = (data) => {
  const parser = new DOMParser();
  return parser.parseFromString(data, 'application/xml');
};

export default parseData;
