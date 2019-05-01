const express = require('express');
const router = express.Router();
const messagesControllers = require('../controllers/messagesAll');

router.get('/', messagesControllers.getMessages);

module.exports = router;