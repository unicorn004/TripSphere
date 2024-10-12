const { addDestination, getAllDestinations } = require('../controllers/destinationsContoller')
const express = require('express')

const router = express.Router();

router.post('/add', addDestination);
router.get('/get', getAllDestinations);

module.exports = router;