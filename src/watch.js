import onChange from 'on-change';
import renderers from './renderers';
import resetInput from './utilities/inputReseter';
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
      if (value === 'loaded') {
        resetInput();
      }

      break;

    case 'feedback':
      renderers.renderFeedback(value, state.status);
      break;

    case 'rssContent.posts.existingPosts':
      renderers.renderPosts(value, state.rssContent.posts.readedPostsLinks);

      clearTimer();
      // eslint-disable-next-line max-len
      setTimer(5000, () => refreshPosts(state.rssContent.addedUrls, value, state.rssContent.posts.readedPostsLinks));
      break;

    case 'rssContent.posts.readedPostsLinks':
      renderers.renderPosts(state.rssContent.posts.existingPosts, value);
      break;

    case 'rssContent.feeds':
      renderers.renderFeeds(value);
      break;

    case 'rssContent.addedUrls':
      if (value.length === 1) {
        renderers.renderLists();
      }
      break;

    default:
      throw new Error(`Unknown state path: ${path}`);
  }
});

export default watch;
