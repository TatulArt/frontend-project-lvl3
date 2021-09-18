import onChange from 'on-change';
import renderers from './renderers';
import resetInput from './utilities/inputReseter';

const watch = (state) => onChange(state, (path, value) => {
  switch (path) {
    case 'status':
      renderers.unblockForm();

      if (value === 'failed') {
        renderers.renderInvalid();
      }
      if (value === 'loading') {
        renderers.blockForm();
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

      break;

    case 'rssContent.posts.readedPostsLinks':
      renderers.markReadedLinks(value);
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
