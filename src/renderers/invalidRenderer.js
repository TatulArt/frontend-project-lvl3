const renderInvalid = () => {
  const input = document.getElementById('url');
  input.classList.add('is-invalid', 'border', 'border-danger');
};

export default renderInvalid;
