const resetInput = () => {
  const input = document.getElementById('url-input');
  input.classList.remove('is-invalid', 'border', 'border-danger');
  input.value = '';
  input.focus();
};

export default resetInput;
