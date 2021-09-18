const blockForm = () => {
  const input = document.getElementById('url');
  input.setAttribute('readonly', '');

  const button = document.getElementById('main-button');
  button.disabled = true;
};

export default blockForm;
