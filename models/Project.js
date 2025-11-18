const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a project title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please provide a project description'],
    maxlength: [2000, 'Description cannot be more than 2000 characters']
  },
  imageUrl: {
    type: String,
    trim: true,
    default: '' 
  },
  repoUrl: {
    type: String,
    trim: true,
    default: ''
  },
  liveUrl: {
    type: String,
    trim: true,
    default: ''
  },
  user: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: [true, 'Please provide a user ID'] 
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Project', ProjectSchema, 'projects');