const unblockForm = () => {
  const input = document.getElementById('url');
  input.removeAttribute('readonly');

  const button = document.getElementById('main-button');
  button.disabled = false;
};

export default unblockForm;
