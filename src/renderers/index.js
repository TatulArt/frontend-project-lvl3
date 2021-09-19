import renderFeeds from './listsContentRenderers/feedsRenderer.js';
import renderInvalid from './invalidRenderer.js';
import renderFeedback from './feedbackRenderer.js';
import blockForm from './formControllers/formBlocker.js';
import unblockForm from './formControllers/formUnblocker.js';
import renderPosts from './listsContentRenderers/postsRenderer.js';
import renderLists from './listsContentRenderers/listsRenderer.js';
import markReadedLinks from './listsContentRenderers/readedLinksMarker.js';
import updatePosts from './listsContentRenderers/postsUpdater.js';

export default {
  blockForm,
  unblockForm,
  renderInvalid,
  renderFeedback,
  renderLists,
  renderFeeds,
  renderPosts,
  updatePosts,
  markReadedLinks,
};
