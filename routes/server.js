const http = require('http');
const path = require('path');
const url = require('url');
const fs = require('fs');
const handleFormSubmission = require('./sendMessage');
const {
    handleGetProducts,
    handleGetImages,
    handleGetProductById,
    handleGetImagesById,
    getFabricationPics,
} = require('./getRoutes');
const {
    handlePostProduct,
    handlePostMainImage,
    handlePostAdditionalImage,
    handlePostSupplierImage,
    handleImageUpload,
} = require('./postRoutes');
const { handleDeleteProduct, handleDeleteImage, handdleDeleteInfaImage } = require('./deleteRoutes');

// ==================== CORS Handling ====================
const enableCors = (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return true;
    }
    return false;
};

// ==================== File Serving Utilities ====================
const serveFile = (filePath, res) => {
    const ext = path.extname(filePath);
    const mimeType = {
        '.html': 'text/html',
        '.css': 'text/css',
        '.js': 'application/javascript',
        '.jpg': 'image/jpeg',
        '.png': 'image/png',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml',
    };
    const contentType = mimeType[ext] || 'application/octet-stream';


    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Internal server error');
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(data);
        }
    });
};

// ==================== Serve Public Folder ====================
const servePublicFolder = (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    let pathname = parsedUrl.pathname;

    const baseDir = path.join(__dirname, '..', 'public');

    if (req.method === 'GET') {
        if (pathname === '/home' || pathname === '/home/') {
            res.writeHead(301, { 'Location': '/home/home.html' });
            res.end();
            return;
        } else if (pathname === '/products' || pathname === '/products/') {
            res.writeHead(301, { 'Location': '/products/products.html' });
            res.end();
            return;
        } else if (pathname === '/contacts' || pathname === '/contacts/') {
            res.writeHead(301, { 'Location': '/contact/contact.html' });
            res.end();
            return;
        } else if (pathname === '/') {
            res.writeHead(301, { 'Location': '/home/home.html' });
            res.end();
            return;
        }else if(pathname === '/login') {
            
            serveFile(path.join(__dirname , '..' , 'public' , 'login' , 'login.html') , res);
            // res.end();
            return;
        }
    }

    if (!path.extname(pathname)) {
        pathname += '.html';
    }

    let filePath = path.join(baseDir, pathname);

    console.log(`Request: [${req.method}] ${pathname}`);

    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
        serveFile(filePath, res);
    } else {
        const segments = pathname.split('/').filter(Boolean); 
        if (segments.length > 1) {
            const newPath = path.join(baseDir, segments[0], ...segments.slice(1));
            if (fs.existsSync(newPath) && fs.statSync(newPath).isFile()) {
                serveFile(newPath, res);
                return;
            }
        }
        handleNotFound(req, res); // Use the handleNotFound function
    }
};

// ==================== Serve Uploads Folder ====================
const serveUploadsFolder = (req, res) => {
    const filePath = path.join(__dirname, 'uploads', req.url.split('/uploads/')[1]);
    console.log("filePath :: :: ", filePath);
    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
        serveFile(filePath, res);
    } else {
        handleNotFound(req, res); // Use the handleNotFound function
    }
};

// ==================== Serve FABIMG Folder ====================
const serveImgsFolder = (req, res) => {
    const fileName = req.url.split('/IMG/')[1];
    const filePath = path.join(__dirname, 'FABIMG', fileName);
    console.log("filePath :: :: ", filePath);

    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
        serveFile(filePath, res);
    } else {
        handleNotFound(req, res); 
    }
};

// ==================== Login Handling ====================
let isLoggedIn = false;
let logoutTimer = null;

const handleLogin = (req, res) => {
    let body = '';
    req.on('data', (chunk) => {
        body += chunk.toString();
    });
    req.on('end', () => {
        console.log("Trying to log in...");
        const { email, password } = JSON.parse(body);
        if (email === 'admin' && password === 'admin') {
            isLoggedIn = true;
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Login successful' }));
            if (logoutTimer) {
                clearTimeout(logoutTimer); 
            }
            logoutTimer = setTimeout(() => {
                isLoggedIn = false;
                console.log("User has been automatically logged out.");
            }, 600000); 

        } else {
            res.writeHead(401, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Invalid credentials' }));
        }
    });
};

// ==================== Serve Server Folder (Protected) ====================
const serveServerFolder = (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const relativePath = parsedUrl.pathname.replace(/^\/protected/, '');
    console.log("relative path : " + relativePath);
    const filePath = path.join(__dirname, '..', 'server', relativePath);
    console.log(`Serving file from: ${filePath}`);
    serveFile(filePath, res, parsedUrl.query);
};

// ==================== Handle Protected Page ====================
const handleProtectedPage = (req, res) => {
    if (isLoggedIn) {
        serveServerFolder(req, res);
    } else {
        // res.writeHead(403, { 'Content-Type': 'text/plain' });
        // res.end('Access denied. Please log in first.');
        // res.writeHead(301, { 'Location': '/login' });
        handleNotFound(req, res); 

            // res.end();
    }
};

// ==================== Handle Not Found (404) ====================
const handleNotFound = (req, res) => {
    const errorPagePath = path.join(__dirname, '..', 'public', '404.html'); 

    if (fs.existsSync(errorPagePath)) {
        fs.readFile(errorPagePath, (err, data) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('404 Not Found');
            } else {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end(data);
            }
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
    }
};

// ==================== Main Server Logic ====================
const server = http.createServer((req, res) => {
    console.log(`Request: [${req.method}] ${req.url}`);

    if (enableCors(req, res)) return;

    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    const query = parsedUrl.query;

    // ==================== Handle PDF File Request ====================
    if (req.method === 'GET' && pathname === '/download/doc/Madad_Gate_offered_services.pdf') {
        const filePath = path.join(__dirname, '..', 'public', 'download', 'doc', 'Madad_Gate_offered_services.pdf');
        fs.access(filePath, fs.constants.F_OK, (err) => {
            if (err) {
                handleNotFound(req, res); // Use the handleNotFound function
            } else {
                res.writeHead(200, {
                    'Content-Type': 'application/pdf',
                    'Content-Disposition': 'inline; filename="Madad_Gate_offered_services.pdf"',
                });
                const fileStream = fs.createReadStream(filePath);
                fileStream.pipe(res);
            }
        });
        return;
    }

    // ==================== Serve Static Files ====================
    if (req.method === 'GET' && !pathname.startsWith('/api') && !pathname.startsWith('/uploads') && !pathname.startsWith('/IMG') && !pathname.startsWith('/protected')) {
        servePublicFolder(req, res);
        return;
    }

    if (req.method === 'GET' && pathname.startsWith('/IMG/')) {
        serveImgsFolder(req, res);
        return;
    }

    if (req.method === 'GET' && pathname.startsWith('/uploads/')) {
        serveUploadsFolder(req, res);
        return;
    }

    // ==================== Handle GET Requests ====================
    if (req.method === 'GET') {
        if (req.url.startsWith('/IMG/')) {
            serveImgsFolder(req, res);
        }
        if (pathname === '/api/products') {
            handleGetProducts(req, res);
        } else if (pathname === '/api/images') {
            handleGetImages(req, res);
        } else if (pathname.startsWith('/api/products/')) {
            const id = pathname.split('/')[3];
            if (id) {
                handleGetProductById(id, req, res);
            } else {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Product ID is required' }));
            }
        } else if (pathname.startsWith('/api/images/')) {
            const id = pathname.split('/')[3];
            if (id) {
                handleGetImagesById(id, req, res);
            } else {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Image ID is required' }));
            }
        } else if (pathname.startsWith('/protected')) {
            handleProtectedPage(req, res);
        } else if (pathname === '/get_product/product.html') {
            const productId = query.id;
            if (productId) {
                const filePath = path.join(__dirname, '..', 'public', 'get_product', 'product.html');
                serveFile(filePath, res, query);
            } else {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Product ID is required' }));
            }
        } else if (pathname === '/api/fabrication-pics') {
            getFabricationPics(req, res);
        } else {
            handleNotFound(req, res); // Use the handleNotFound function
        }
        return;
    }

    // ==================== Handle POST Requests ====================
    if (req.method === 'POST') {
        if (pathname === '/api/login') {
            handleLogin(req, res);
        } else if (pathname === '/api/products') {
            handlePostProduct(req, res);
        } else if (pathname === '/api/images') {
            handlePostMainImage(req, res);
        } else if (pathname === '/api/images/main') {
            handlePostMainImage(req, res);
        } else if (pathname === '/api/images/additional') {
            handlePostAdditionalImage(req, res);
        } else if (pathname === '/api/images/supplier') {
            handlePostSupplierImage(req, res);
        } else if (pathname === '/submit-form') {
            handleFormSubmission(req, res);
        } else if (req.method === 'POST' && req.url === '/api/fabrication-pics') {
            handleImageUpload(req, res);
        } else {
            handleNotFound(req, res); // Use the handleNotFound function
        }
        return;
    }

    // ==================== Handle DELETE Requests ====================
    if (req.method === 'DELETE') {
        if (pathname.startsWith('/api/products/')) {
            handleDeleteProduct(req, res);
        } else if (pathname.startsWith('/api/images/')) {
            handleDeleteImage(req, res);
        } else if (pathname.startsWith('/api/fabrication-pics/')) {
            handdleDeleteInfaImage(req, res);
        } else {
            handleNotFound(req, res); // Use the handleNotFound function
        }
        return;
    }

    // ==================== Handle All Other Routes (404 Not Found) ====================
    handleNotFound(req, res); // Use the handleNotFound function
});

// ==================== Start the Server ====================
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});