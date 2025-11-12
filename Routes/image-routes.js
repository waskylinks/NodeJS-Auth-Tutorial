const express = require('express');
const authMiddleware = require('../Middleware/auth-middleware');
const adminMiddleware = require('../Middleware/admin-middleware');
const uploadMiddleware = require('../Middleware/upload-middleware');
const {
    uploadImageController, 
    fetchImagesController,
    deleteImageController,
} = require('../Controllers/image-controller')

const router = express.Router();

//upload the image
router.post(
    "/upload", 
    authMiddleware, 
    adminMiddleware, 
    uploadMiddleware.single('image'), 
    uploadImageController
);


//get all the images
router.get('/get', authMiddleware, fetchImagesController);

//delete image route
router.delete('/:id', authMiddleware, adminMiddleware, deleteImageController);


module.exports = router;
