const mongoose = require('mongoose');

const BlogPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a blog title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  content: {
    type: String,
    required: [true, 'Please provide blog content'],
    maxlength: [5000, 'Content cannot be more than 5000 characters']
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please provide an author ID']
  }
}, {
  timestamps: true 
});
module.exports = mongoose.model('BlogPost', BlogPostSchema, 'blogposts');