const express = require('express');
const {
  getBlogPosts,
  getBlogPost,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost
} = require('../controllers/blogPostController'); 
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();


router.get('/', getBlogPosts);
router.get('/:id', getBlogPost);


router.post('/', protect, createBlogPost);
router.put('/:id', protect, updateBlogPost);
router.delete('/:id', protect, deleteBlogPost);

module.exports = router;