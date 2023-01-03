const express = require('express');
const router = express.Router();

const alphaVantageController = require('../controllers/alphaVantageController');

// routes
router.route('/companies').get(alphaVantageController.companies);
router.route('/info').get(alphaVantageController.info);

// export module
module.exports = router;