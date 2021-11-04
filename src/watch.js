import onChange from 'on-change';
import renderers from './utilities/renderers';
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

    case 'rssContent.postsData.posts':
      renderers.renderPosts(value, state.rssContent.postsData.readedPostsLinks);
      break;

    case 'rssContent.postsData.readedPostsLinks':
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
