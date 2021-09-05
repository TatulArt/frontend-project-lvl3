import onChange from 'on-change';
import renderers from './renderers';
import refreshPosts from './utilities/postsRefresher.js';
import { setTimer, clearTimer } from './utilities/timer.js';

const watch = (state) => onChange(state, (path, value) => {
  switch (path) {
    case 'status':
      renderers.unblockButton();

      if (value === 'failed') {
        renderers.renderInvalid();
      }
      if (value === 'loading') {
        renderers.blockButton();
      }

      break;

    case 'feedback':
      renderers.renderFeedback(value, state.status);
      break;

    case 'rssFeeds.parsedFeeds':
      renderers.renderValid(value);
      break;
    case 'rssFeeds.addedUrls':
      clearTimer();
      setTimer(5000, () => refreshPosts(value));

      break;

    default:
      throw new Error(`Unknown state path: ${path}`);
  }
});

export default watch;
