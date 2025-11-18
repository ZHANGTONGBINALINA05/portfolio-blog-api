const Comment = require('../models/Comment');
const BlogPost = require('../models/BlogPost'); 
exports.getPostComments = async (req, res, next) => {
  try {
    const comments = await Comment.find({ post: req.params.postId })
      .populate('author', 'username')
      .sort({ createdAt: -1 });

    res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
};
exports.createComment = async (req, res, next) => {
  try {
    const blogPost = await BlogPost.findById(req.params.postId);
    if (!blogPost) {
      res.status(404);
      throw new Error('Blog post not found (cannot add comment)');
    }
    const commentData = {
      body: req.body.body,
      author: req.user._id, 
      post: req.params.postId 
    };


    const comment = await Comment.create(commentData);


    const populatedComment = await Comment.findById(comment._id)
      .populate('author', 'username');

    res.status(201).json(populatedComment);
  } catch (error) {
    next(error);
  }
};