const db = require('./db');
const upload = require('./upload');
const path = require('path');
const uploadIMG = require('./uploadIMG'); 

const handlePostProduct = (req, res) => {
    upload.single('supplier_image')(req, res, (err) => {
        if (err) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: err.message || 'File upload error' }));
            return;
        }

        const { name, category, description, available_sizes, standards } = req.body;
        
        // const supplierImage = req.file ? `/uploads/${req.file.filename}` : null;

        if (!name || !category || !description || !available_sizes || !standards) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Missing required fields' }));
            return;
        }

        db.run(
            'INSERT INTO products (name, category, description, available_sizes, standards) VALUES (?, ?, ?, ?, ?)',
            [name, category, description, available_sizes, standards],
            function (err) {
                if (err) {
                    console.error('Database error:', err); 
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Database error' }));
                } else {
                    console.log('Product added with ID:', this.lastID); 
                    res.writeHead(201, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ id: this.lastID }));
                }
            }
        );
    });
};

const handlePostMainImage = (req, res) => {
    upload.single('main_image')(req, res, (err) => {
        if (err) {
            console.error('File upload error:', err);
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: err.message || 'File upload error' }));
            return;
        }

        const { product_id } = req.body;
        const mainImage = req.file ? `/uploads/${req.file.filename}` : null;
        const mainName =req.file.filename;
        if (!product_id || !mainImage) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Missing required fields' }));
            return;
        }

        db.run(
            `INSERT INTO images (product_id, main_image) VALUES (?, ?)`,
            [product_id, mainName],
            function (err) {
                if (err) {
                    console.error('Database error:', err);
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Database error' }));
                } else {
                    console.log('Main image added with ID:', this.lastID);
                    res.writeHead(201, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ id: this.lastID }));
                }
            }
        );
    });
};


const handlePostAdditionalImage = (req, res) => {
    upload.single('additional_image')(req, res, (err) => {
        if (err) {
            console.error('File upload error:', err);
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: err.message || 'File upload error' }));
            return;
        }

        const { product_id } = req.body;
        const additionalImage = req.file ? `${req.file.filename}` : null;

        if (!product_id || !additionalImage) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Missing required fields' }));
            return;
        }

        db.run(
            `UPDATE images SET additional_image = ? WHERE product_id = ?`,
            [additionalImage, product_id],
            function (err) {
                if (err) {
                    console.error('Database error:', err);
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Database error' }));
                } else if (this.changes === 0) {
                    res.writeHead(404, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Product not found in images table' }));
                } else {
                    console.log('Additional image updated for product ID:', product_id);
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ success: true }));
                }
            }
        );
    });
};


const handlePostSupplierImage = (req, res) => {
    upload.single('supplier_image')(req, res, (err) => {
        if (err) {
            console.error('File upload error:', err);
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: err.message || 'File upload error' }));
            return;
        }

        const { product_id } = req.body;
        const supplierImage = req.file ? `${req.file.filename}` : null;

        if (!product_id || !supplierImage) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Missing required fields' }));
            return;
        }

        db.run(
            `UPDATE products SET supplier_image = ? WHERE id = ?`,
            [supplierImage, product_id],
            function (err) {
                if (err) {
                    console.error('Database error:', err);
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Database error' }));
                } else if (this.changes === 0) {
                    res.writeHead(404, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Product not found' }));
                } else {
                    console.log('Supplier image updated for product ID:', product_id);
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ success: true }));
                }
            }
        );
    });
};









function handleImageUpload(req, res) {
    // Use the uploadIMG middleware for single-file upload
    uploadIMG.single('fabrication_img')(req, res, (err) => {
        if (err) {
            // Handle multer errors (e.g., file size limit, invalid file type)
            console.error('File upload error:', err);
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: err.message || 'File upload error' }));
            return;
        }

        // Check if a file was uploaded
        if (!req.file) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'No file uploaded' }));
            return;
        }

        // File was uploaded successfully
        const filePath = `${req.file.filename}`; // Path where the file is saved (relative to the IMG folder)
        const description = req.body.description || 'Fabrication Service'; // Get description from the request body

        // Insert the file path and description into the database
        const query = 'INSERT INTO fabrication_pics (image_path, description) VALUES (?, ?)';
        db.run(query, [filePath, description], function (err) {
            if (err) {
                console.error('Database error:', err);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Database error' }));
            } else {
                console.log('File path and description saved to database with ID:', this.lastID);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({
                    message: 'File uploaded and saved to database successfully',
                    filePath: filePath,
                    description: description,
                    fileId: this.lastID, // ID of the newly inserted record
                }));
            }
        });
    });
}

module.exports = {
    handlePostProduct,
    handlePostSupplierImage,
    handlePostMainImage,
    handlePostAdditionalImage,
    handleImageUpload
};
