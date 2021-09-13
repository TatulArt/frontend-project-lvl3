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

export default markReadedLinks;
