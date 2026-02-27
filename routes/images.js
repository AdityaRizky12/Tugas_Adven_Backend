const express = require('express')
const imageController = require('../controllers/image.controller')
const imageUplouder = require('../helpers/image-uplouder')
const checkAuth = require('../middleware/check-auth')

const router = express.Router();

router.post('/uploads' , checkAuth.checkAuth, imageUplouder.upload.single('image'), imageController.upload)

module.exports = router;