const express = require('express')
const router = express.Router();
const {loginUser, registerUser, changePassword} = require('../Controllers/auth-controller');

//all routes related to auth
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/change-password', changePassword);



module.exports = router;