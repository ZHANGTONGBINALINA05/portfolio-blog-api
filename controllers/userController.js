const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); 
const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET, 
    { expiresIn: process.env.JWT_EXPIRE } 
  );
};

exports.registerUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const userExists = await User.findOne({ 
      $or: [{ email }, { username }] 
    });

    if (userExists) {
      res.status(400); 
      throw new Error('User already exists (email or username taken)');
    }

    const user = await User.create({
      username,
      email,
      password 
    });
    res.status(201).json({ 
      _id: user._id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id)
    });
  } catch (error) {
    next(error); 
  }
};
exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400);
      throw new Error('Please provide both email and password');
    }

    const user = await User.findOne({ email }).select('+password');


    if (!user) {
      res.status(401); 
      throw new Error('Invalid credentials (user not found)');
    }


    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      res.status(401);
      throw new Error('Invalid credentials (wrong password)');
    }

    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id)
    });
  } catch (error) {
    next(error);
  }
};