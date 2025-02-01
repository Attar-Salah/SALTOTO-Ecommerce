
const handleLogin = (req, res) => {
    console.log("login page");
    let body = '';
    req.on('data', (chunk) => {
        body += chunk.toString();
    });
    req.on('end', () => {
        console.log("try login in ");
        const { email, password } = JSON.parse(body);
        if (email === 'attarsalah2003@outlook.com' && password === 'admin') {
            isLoggedIn = true;
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Login successful' }));
        } else {
            res.writeHead(401, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Invalid credentials' }));
        }5
    });
};


module.exports = handleLogin;
