const { setUserCity, loginUser } = require('../controllers/userControllers')

const express = require('express')

const router = express.Router();

router.post('/city', setUserCity);
router.post('/login', loginUser);

module.exports = router;