const express = require('express');
const { verifyToken } = require('../middlewares');
const { sendMessage, getMessages } = require('../controllers/chatController');

const router = express.Router();

// 메시지 전송
router.post('/message', verifyToken, sendMessage);

// 메시지 가져오기
router.get('/messages/:nickname', verifyToken, getMessages);

module.exports = router;
