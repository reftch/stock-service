const express = require('express');
const router = express.Router();

const alphaVantageController = require('../controllers/alphaVantageController');

// routes
router.route('/search').get(alphaVantageController.search);
router.route('/overview').get(alphaVantageController.overview);
router.route('/daily').get(alphaVantageController.daily);

router.route('/info').get(alphaVantageController.info);

// export module
module.exports = router;