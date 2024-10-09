const { setUserCity } = require('../controllers/userControllers')

const express = require('express')

const router = express.Router();

router.post('/city', setUserCity);

module.exports = router;