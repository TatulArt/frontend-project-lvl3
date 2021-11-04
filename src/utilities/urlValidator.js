const validateUrl = (url) => {
  const proxyUrl = new URL('https://hexlet-allorigins.herokuapp.com/get');
  const urlParams = proxyUrl.searchParams;
  urlParams.set('disableCache', true);
  urlParams.set('url', url);

  return proxyUrl.toString();
};

export default validateUrl;
