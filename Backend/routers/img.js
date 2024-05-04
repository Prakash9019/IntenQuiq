// backend/routes/upload.js
const express = require('express');
const router = express.Router();
const multer = require('multer');

// Set up multer storage (customize as needed)
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

// Handle image upload
router.post('/upload', upload.single('image'), (req, res) => {
  // Process the uploaded image (e.g., save to DB, resize, etc.)
  console.log('Image uploaded:', req.file);
  res.status(200).json({ message: 'Image uploaded successfully' });
});

module.exports = router;
