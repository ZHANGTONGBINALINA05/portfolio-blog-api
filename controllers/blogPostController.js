const BlogPost = require('../models/BlogPost'); 
const Comment = require('../models/Comment'); 
exports.getBlogPosts = async (req, res, next) => {
  try {
    const posts = await BlogPost.find()
      .populate('author', 'username')
      .sort({ createdAt: -1 }); 

    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};
exports.getBlogPost = async (req, res, next) => {
  try {
    const post = await BlogPost.findById(req.params.id)
      .populate('author', 'username') 
      .populate({
        path: 'comments', 
        populate: { path: 'author', select: 'username' } 
      });

    if (!post) {
      res.status(404);
      throw new Error('Blog post not found');
    }

    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};
exports.createBlogPost = async (req, res, next) => {
  try {

    req.body.author = req.user._id;

    const post = await BlogPost.create(req.body);
    res.status(201).json(post);
  } catch (error) {
    next(error);
  }
};
exports.updateBlogPost = async (req, res, next) => {
  try {
    let post = await BlogPost.findById(req.params.id);

    if (!post) {
      res.status(404);
      throw new Error('Blog post not found');
    }
    if (post.author.toString() !== req.user._id.toString()) {
      res.status(403);
      throw new Error('Not authorized to update this blog post');
    }
    post = await BlogPost.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('author', 'username');

    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};
exports.deleteBlogPost = async (req, res, next) => {
  try {
    const post = await BlogPost.findById(req.params.id);

    if (!post) {
      res.status(404);
      throw new Error('Blog post not found');
    }
    if (post.author.toString() !== req.user._id.toString()) {
      res.status(403);
      throw new Error('Not authorized to delete this blog post');
    }
    await Comment.deleteMany({ post: req.params.id });

    await post.remove();
    res.status(200).json({ message: 'Blog post deleted successfully' });
  } catch (error) {
    next(error);
  }
};