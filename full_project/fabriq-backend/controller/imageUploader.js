const multer = require('multer');
const Image = require('../models/ImageData');

// Multer Setup for File Upload
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Upload Image
const uploadImage = async (req, res) => {
    try {
        const { originalname, mimetype, buffer } = req.file;
        const image = new Image({
            filename: originalname,
            contentType: mimetype,
            imageBase64: buffer.toString('base64'),
        });

        await image.save();
        res.status(201).json({ message: 'Image uploaded successfully', image });
    } catch (error) {
        res.status(500).json({ message: 'Error uploading image', error });
    }
};

// Get a Single Image by ID
const getImageById = async (req, res) => {
  try {
      const image = await Image.findById(req.params.id);
      if (!image) {
          return res.status(404).json({ message: "Image not found" });
      }
      res.json(image);
  } catch (error) {
      res.status(500).json({ message: "Error fetching image", error });
  }
};

// Delete an Image by ID
const deleteImage = async (req, res) => {
  try {
      const image = await Image.findByIdAndDelete(req.params.id);
      if (!image) {
          return res.status(404).json({ message: "Image not found" });
      }
      res.json({ message: "Image deleted successfully" });
  } catch (error) {
      res.status(500).json({ message: "Error deleting image", error });
  }
};


module.exports = { upload, uploadImage, getImageById, deleteImage};
