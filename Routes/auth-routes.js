const express = require('express')
const {loginUser, registerUser, changePassword} = require('../Controllers/auth-controller');
const authMiddleware = require('../Middleware/auth-middleware');

const router = express.Router();

//all routes related to auth
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/change-password', authMiddleware, changePassword);



module.exports = router;