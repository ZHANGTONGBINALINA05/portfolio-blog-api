const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please provide a username'], 
    unique: true, 
    trim: true, 
    maxlength: [50, 'Username cannot be more than 50 characters'] // 长度限制
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please provide a valid email' 
    ]
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: [6, 'Password must be at least 6 characters'], // 密码最小长度
    select: false 
  }
}, {
  timestamps: true 
});
UserSchema.pre('save', async function (next) {
  
  if (!this.isModified('password')) {
    next();
  }

  
  const salt = await bcrypt.genSalt(10);
  
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
module.exports = mongoose.model('User', UserSchema, 'users');