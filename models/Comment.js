const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  body: {
    type: String,
    required: [true, 'Please provide a comment'],
    trim: true,
    maxlength: [1000, 'Comment cannot be more than 1000 characters']
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please provide an author ID']
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BlogPost',
    required: [true, 'Please provide a blog post ID']
  }
}, {
  timestamps: true
});
module.exports = mongoose.model('Comment', CommentSchema, 'comments');