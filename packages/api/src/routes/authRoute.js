const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');

// Routes
router.route('/').post(authController.token);

// export module
module.exports = router;