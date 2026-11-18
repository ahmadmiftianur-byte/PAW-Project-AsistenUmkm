const router = require('express').Router();
const chatController = require('../controllers/chat.controller');
const validateChatInput = require('../middlewares/validateChatInput');

// Halaman chatbot (GET /chat)
router.get('/chat', chatController.tampilkanChat);

// Endpoint API chatbot — middleware validasi input wajib dari dosen (POST /api/chat)
router.post('/api/chat', validateChatInput, chatController.chat);

module.exports = router;
