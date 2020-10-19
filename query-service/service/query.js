/**
 * @author Gagandeep Singh
 * @email singh.gagandeep3911@gmail.com
 * @create date 2020-10-19 11:45:38
 * @modify date 2020-10-19 11:45:38
 * @desc Manage Queries
 */
const posts = {};

/**
 *
 * @description Fetches all Posts and Comments associated with it
 */
exports.fetchPostsAndComments = (req, res) => res.send(posts);

/**
 * @description Recieves an event with new posts, it then Maps and stores all posts and comments in memory
 */
exports.recieveEvents = (req, res) => {
  const { type, data } = req.body;
  switch (type) {
    case 'PostCreated':
      const { id, title } = data;
      posts[id] = { id, title, comments: [] };
      break;
    case 'CommentCreated':
      const { id: commentId, content, postId } = data;
      const post = posts[postId];
      post.comments.push({ id: commentId, content });
      break;
  }
  res.send({ status: 'OK' });
};
