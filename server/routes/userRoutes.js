const { setUserCity, loginUser, signupUser } = require('../controllers/userControllers')

const express = require('express')

const router = express.Router();

router.post('/city', setUserCity);
router.post('/login', loginUser);
router.post('/signup', signupUser);

module.exports = router;