const renderFeedback = (feedbackMessage, status) => {
  const messagePlaceholder = document.getElementById('feedback-message');
  if (status === 'loaded') {
    messagePlaceholder.classList.remove('text-danger');
    messagePlaceholder.classList.add('text-success');
  } else {
    messagePlaceholder.classList.add('text-danger');
    messagePlaceholder.classList.remove('text-success');
  }

  messagePlaceholder.innerHTML = feedbackMessage;
};

export default renderFeedback;
