const express = require('express');
const {
  getPostComments,
  createComment
} = require('../controllers/commentController'); 
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/:postId/comments', getPostComments);
router.post('/:postId/comments', protect, createComment);

module.exports = router;