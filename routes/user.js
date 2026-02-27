const express = require('express');
const userController = require('../controllers/user.controller');

const router = express.Router();

router.post('/signup', userController.signUp);
router.post('/login', userController.Login);
router.get('/verify/:token', userController.verifyEmail);

module.exports = router;