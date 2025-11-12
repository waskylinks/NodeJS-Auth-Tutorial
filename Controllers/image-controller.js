const Image = require('../Models/Image');
const {uploadToCloudinary} = require('../helpers/cloudinary-Helper');
const fs = require('fs');
const cloudinary = require('../config/cloudinary');

const uploadImageController = async (req, res) => {
    try {
        //check if file is present in the request
        if(!req.file) {
            return res.status(400).json({
                success: false,
                message: 'No file uploaded. Please attach an image file.'
            });
        }

        //upload image to cloudinary
        const {url, publicId} = await uploadToCloudinary(req.file.path);

        //save image details to database
        const newImage = new Image({
            url,
            publicId,
            uploadedBy: req.userInfo.userId,
        });

        await newImage.save();

        //delete the file from local storage
        fs.unlinkSync(req.file.path);

        res.status(201).json({
            success: true,
            message: 'Image uploaded successfully',
            image: newImage,
        });

    } catch (e) {
        console.error('Error uploading image', e);
        res.status(500).json({
            success: false,
            message: 'Some error occurred while uploading image. Please try again.'
        });
    }
};

//controller for fetching all images 
const fetchImagesController = async(req, res) => {
    try{
        const images = await Image.find({});

        if (images) {
            res.status(200).json({
                success: true,
                data: images,
            });
        }

    } catch (e) {
        console.error('Error fetching image', e);
        res.status(500).json({
            success: false,
            message: 'Some error occurred while fetching images. Please try again.'
        });
    }
};

//delete images from cloudinary
const deleteImageController = async (req, res) => {
    try{
        const getCurrentImageIdToBeDeleted = req.params.id;
        const userId = req.userInfo.userId;

        const image = await Image.findById(getCurrentImageIdToBeDeleted);
        if(!image) {
            return res.status(404).json({
                success: false,
                message: 'Invalid image id! Image not found'
            });
        }

        //check if this image is uploaded by the current user who is trying to delete the image
        if (image.uploadedBy.toString() !== userId) {
            return res.status(403).json({
                success: false,
                message: 'You are not authorized to delete this image'
            });
        }
        
        //delete this image first from cloudinary storage
        await cloudinary.uploader.destroy(image.publicId);

        //delete the image from mongodb database
        await Image.findByIdAndDelete(getCurrentImageIdToBeDeleted);

        res.status(200).json({
            success: true,
            message: 'Image delete successfully'
        });

    } catch(e) {
        console.error('Error deleting image', e);
        res.status(500).json({
            success: false,
            message: 'Some error occurred while deleting images from cloudinary. Please try again.'
        });
    }
};

module.exports = {
    uploadImageController,
    fetchImagesController,
    deleteImageController,
};