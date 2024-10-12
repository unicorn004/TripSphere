const express = require('express');
const { addMessage, getMessages, deleteMessages } = require('../controllers/messagesController');

const router = express.Router();

router.post('/add', addMessage);
router.get('/get', getMessages);
router.delete('/delete', deleteMessages);

module.exports = router;