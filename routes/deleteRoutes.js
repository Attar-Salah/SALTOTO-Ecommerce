const db = require('./db');

const handleDeleteProduct = (req, res) => {
    const id = req.url.split('/').pop();
    db.run('DELETE FROM products WHERE id = ?', id, (err) => {
        if (err) {
            res.writeHead(500);
            res.end(JSON.stringify({ error: 'Database error' }));
        } else {
            res.writeHead(200);
            res.end(JSON.stringify({ message: 'Product deleted' }));
        }
    });
};

const handleDeleteImage = (req, res) => {
    const id = req.url.split('/').pop();
    db.run('DELETE FROM images WHERE id = ?', id, (err) => {
        if (err) {
            res.writeHead(500);
            res.end(JSON.stringify({ error: 'Database error' }));
        } else {
            res.writeHead(200);
            res.end(JSON.stringify({ message: 'Image deleted' }));
        }
    });
};


const handdleDeleteInfaImage = (req,res)=> {
    const id = req.url.split('/').pop();
    db.run('DELETE FROM fabrication_pics WHERE id = ?' , id , (err) => {
        if(err) {
            res.writeHead(500);
            res.end(JSON.stringify({error : 'DataBase Error'}));
        }else {
            res.writeHead(200);
            res.end(JSON.stringify({message: 'Image Deleted'}));
        }
    })
}




module.exports = {
    handleDeleteProduct,
    handleDeleteImage,
    handdleDeleteInfaImage
};
