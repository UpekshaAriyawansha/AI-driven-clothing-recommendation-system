// const express = require("express");
// const { uploadImage } = require("../controller/imageUploader"); 

// const router = express.Router();

// router.post("/upload", uploadImage);

// module.exports = router;
const express = require('express');
const {  upload, uploadImage, getImageById, deleteImage } = require('../controller/imageUploader');

const router = express.Router();

router.post('/upload', upload.single('image'), uploadImage);
router.get('/:id', getImageById);
router.delete('/:id', deleteImage);

module.exports = router;
