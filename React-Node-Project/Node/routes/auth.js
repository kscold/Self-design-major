const express = require('express');
const { verifyToken } = require('../middlewares');
const { join, login, logout } = require('../controllers/authController');
const passport = require('passport');
const { default: axios } = require('axios');

const router = express.Router();

// POST /auth/join
router.post('/join', join);

// POST /auth/login
router.post('/login', login);

// GET /auth/logout
router.get('/logout', verifyToken, logout);

module.exports = router;
