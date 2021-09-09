import renderFeeds from './listsContentRenderers/feedsRenderer.js';
import renderInvalid from './invalidRenderer.js';
import renderFeedback from './feedbackRenderer.js';
import blockButton from './buttonRenderers/buttonBlocker.js';
import unblockButton from './buttonRenderers/buttonUnblocker.js';
import renderPosts from './listsContentRenderers/postsRenderer.js';
import renderLists from './listsContentRenderers/listsRenderer.js';

export default {
  renderInvalid,
  renderFeedback,
  blockButton,
  unblockButton,
  renderFeeds,
  renderPosts,
  renderLists,
};
