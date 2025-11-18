const express = require('express');
const { registerUser, loginUser } = require('../controllers/userController'); // 路径正确

const router = express.Router();
router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;