const db = require('./db');
const url = require('url'); // Import the 'url' module for parsing URLs

const handleGetProducts = (req, res) => {
    db.all('SELECT * FROM products', [], (err, rows) => {
        if (err) {
            console.error('Database error:', err);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Database error' }));
            return;
        }
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(rows));
    });
};

const handleGetImages = (req, res) => {
    db.all('SELECT * FROM images', [], (err, rows) => {
        if (err) {
            console.error('Database error:', err);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Database error' }));
            return;
        }
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(rows));
    });
};

const handleGetProductById = (id, req, res) => {
    db.get('SELECT * FROM products WHERE id = ?', [id], (err, row) => {
        if (err) {
            console.error('Database error:', err);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Database query error' }));
            return;
        }

        if (!row) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Product not found' }));
            return;
        }

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(row));
    });
};

const handleGetImagesById = (req, res) => {
    const parsedUrl = url.parse(req.url, true); // Parse the URL
    const productId = parsedUrl.query.product_id; // Get `product_id` from the query string

    if (!productId) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Missing product_id in query string' }));
        return;
    }

    db.all('SELECT * FROM images WHERE product_id = ?', [productId], (err, rows) => {
        if (err) {
            console.error('Database error:', err);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Database query error' }));
            return;
        }

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(rows));
    });
};

const getFabricationPics = (req,res) => {
    const query = 'SELECT * FROM fabrication_pics';
    db.all(query,[],(err,rows) =>{
        if(err) {
            res.writeHead(500 , {'Content-Type' : 'application/json'});
            res.end(JSON.stringify({error : err.message}));
            return;
        }

        res.writeHead(200 , {'Content-Type' : 'application/json'});
        res.end(JSON.stringify(rows));
    })
}

module.exports = {
    handleGetProducts,
    handleGetImages,
    handleGetProductById,
    handleGetImagesById,
    getFabricationPics
};