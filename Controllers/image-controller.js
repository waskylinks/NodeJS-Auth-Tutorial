const Image = require('../Models/Image');
const {uploadToCloudinary} = require('../helpers/cloudinary-Helper');

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
}

module.exports = {
    uploadImageController,
};