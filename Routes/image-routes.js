const express = require('express');
const authMiddleware = require('../Middleware/auth-middleware');
const adminMiddleware = require('../Middleware/admin-middleware');

const router = express.router();

//upload the image
router.post('/upload', authMiddleware, adminMiddleware, (req, res) => {
    
})


//get all the images


module.exports = {
    router
}