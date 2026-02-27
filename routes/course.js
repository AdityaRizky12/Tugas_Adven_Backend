const express = require('express');
const router = express.Router();

const courseController = require('../controllers/course.controller');
const checkAuthMiddleware = require('../middleware/check-auth')

router.post('/courses', checkAuthMiddleware.checkAuth , courseController.save);
router.get('/courses', checkAuthMiddleware.checkAuth , courseController.index);
router.get('/courses/:id', checkAuthMiddleware.checkAuth, courseController.show);
router.patch('/courses/:id', checkAuthMiddleware.checkAuth , courseController.update);
router.delete('/courses/:id', checkAuthMiddleware.checkAuth , courseController.destroy);

module.exports = router;