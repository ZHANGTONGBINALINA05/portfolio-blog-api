const Message = require('../models/Message'); 
exports.createMessage = async (req, res, next) => {
  try {
    const message = await Message.create(req.body);

    res.status(201).json({
      message: 'Message sent successfully',
      data: message
    });
  } catch (error) {
    next(error);
  }
};