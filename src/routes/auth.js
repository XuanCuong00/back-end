const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');

router.get('/login', authController.login);
router.post('/login', authController.login_post);
router.get('/signup', authController.signup);
router.post('/signup', authController.signup_post);

module.exports = router;