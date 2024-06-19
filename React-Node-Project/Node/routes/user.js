const express = require('express');
const { verifyToken } = require('../middlewares');
const {
    join,
    login,
    logout,
    getAllUsers,
    getUserById,
} = require('../controllers/userController');
const passport = require('passport');

const router = express.Router();

// POST /auth/join
router.post('/auth/join', join);

// POST /auth/login
router.post('/auth/login', login);

// GET /auth/logout
router.get('/auth/logout', verifyToken, logout);

router.get('/users/', verifyToken, getAllUsers);

// Get a specific user
router.get('/users/:userId', verifyToken, getUserById);

module.exports = router;
