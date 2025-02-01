const multer = require('multer');
const path = require('path');

// Configure storage for uploaded files (save in FABIMG folder)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, 'FABIMG')); // Save files in the FABIMG directory
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const fileExt = path.extname(file.originalname); // Get the file extension
        cb(null, `${uniqueSuffix}${fileExt}`); // Generate unique filenames with extensions
    },
});

// Configure file filter to allow only specific MIME types
const fileFilter = (req, file, cb) => {
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (validTypes.includes(file.mimetype)) {
        cb(null, true); // Accept the file
    } else {
        cb(new Error('Invalid file type. Only JPEG, PNG, GIF, and WEBP are allowed.'), false);
    }
};

// Initialize multer with the configured storage and file filter
const uploadIMG = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB file size limit
    fileFilter: fileFilter,
});

module.exports = uploadIMG;