const express = require('express');
const router = express.Router();
const messageControllers = require('../controllers/message');

router.post('/', messageControllers.createMessage);
router.get('/:message_id', messageControllers.getMessage)
router.post('/:message_id', messageControllers.deleteMessage);

module.exports = router;