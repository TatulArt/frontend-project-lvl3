const updatePosts = (newPosts, existingPosts) => {
  const newPostsContent = newPosts.map((post) => post.innerHTML);
  const existingPostsContent = existingPosts.map((post) => post.innerHTML);

  const uniquePosts = newPostsContent
    .filter((postContent) => !existingPostsContent.includes(postContent))
    .map((uniquePostContent) => newPosts[newPostsContent.indexOf(uniquePostContent)]);

  return [...uniquePosts, ...existingPosts];
};

export default updatePosts;
