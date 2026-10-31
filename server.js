const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const ROOT_DIR = __dirname;
const PUBLIC_DIR = fs.existsSync(path.join(__dirname, 'public', 'index.html')) ? path.join(__dirname, 'public') : __dirname;
const DATA_FILE = path.join(__dirname, 'data', 'portfolio.json');
const PUBLIC_DATA_FILE = path.join(PUBLIC_DIR, 'data', 'portfolio.json');
const UPLOADS_DIR = path.join(__dirname, 'uploads');
const PUBLIC_UPLOADS_DIR = path.join(PUBLIC_DIR, 'uploads');

// Ensure directories exist
[UPLOADS_DIR, PUBLIC_UPLOADS_DIR, path.dirname(DATA_FILE), path.dirname(PUBLIC_DATA_FILE)].forEach(dir => {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

const MIME_TYPES = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.webp': 'image/webp',
    '.svg': 'image/svg+xml',
    '.gif': 'image/gif',
    '.ico': 'image/x-icon',
    '.mp4': 'video/mp4',
    '.webm': 'video/webm',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
    '.ttf': 'font/ttf'
};

const server = http.createServer((req, res) => {
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        return res.end();
    }

    const reqUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
    let pathname = decodeURIComponent(reqUrl.pathname);

    // API Routes
    if (pathname === '/api/portfolio') {
        if (req.method === 'GET') {
            try {
                if (fs.existsSync(DATA_FILE)) {
                    const data = fs.readFileSync(DATA_FILE, 'utf8');
                    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
                    return res.end(data);
                } else {
                    res.writeHead(404, { 'Content-Type': 'application/json' });
                    return res.end(JSON.stringify({ error: 'Portfolio data not found' }));
                }
            } catch (err) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ error: err.message }));
            }
        }

        if (req.method === 'POST' || req.method === 'PUT') {
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString();
                if (body.length > 50 * 1024 * 1024) req.destroy();
            });

            req.on('end', () => {
                try {
                    const updated = JSON.parse(body);
                    const formatted = JSON.stringify(updated, null, 2);

                    // Save to both data/portfolio.json and public/data/portfolio.json
                    fs.writeFileSync(DATA_FILE, formatted, 'utf8');
                    if (DATA_FILE !== PUBLIC_DATA_FILE) {
                        fs.writeFileSync(PUBLIC_DATA_FILE, formatted, 'utf8');
                    }

                    console.log(`[${new Date().toLocaleTimeString()}] Portfolio data updated successfully on disk!`);
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    return res.end(JSON.stringify({ success: true, message: 'Portfolio saved successfully!' }));
                } catch (err) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    return res.end(JSON.stringify({ error: 'Invalid JSON data: ' + err.message }));
                }
            });
            return;
        }
    }

    // Image/Media Upload API (Base64)
    if (pathname === '/api/upload' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
            if (body.length > 50 * 1024 * 1024) req.destroy();
        });

        req.on('end', () => {
            try {
                const { filename, base64Data } = JSON.parse(body);
                if (!base64Data) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    return res.end(JSON.stringify({ error: 'base64Data is required' }));
                }

                const matches = base64Data.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
                let buffer;
                let ext = '.png';
                if (matches) {
                    const mime = matches[1];
                    buffer = Buffer.from(matches[2], 'base64');
                    if (mime.includes('jpeg') || mime.includes('jpg')) ext = '.jpg';
                    else if (mime.includes('webp')) ext = '.webp';
                    else if (mime.includes('svg')) ext = '.svg';
                    else if (mime.includes('mp4')) ext = '.mp4';
                } else {
                    buffer = Buffer.from(base64Data, 'base64');
                }

                const safeName = (filename ? path.parse(filename).name.replace(/[^a-zA-Z0-9_-]/g, '') : 'upload') + '_' + Date.now() + ext;
                const targetPath1 = path.join(UPLOADS_DIR, safeName);
                const targetPath2 = path.join(PUBLIC_UPLOADS_DIR, safeName);

                fs.writeFileSync(targetPath1, buffer);
                if (targetPath1 !== targetPath2) {
                    fs.writeFileSync(targetPath2, buffer);
                }

                const publicUrl = `uploads/${safeName}`;
                console.log(`[Upload] File saved: ${publicUrl} (${buffer.length} bytes)`);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ success: true, url: publicUrl, filename: safeName }));
            } catch (err) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ error: err.message }));
            }
        });
        return;
    }

    // Static File Serving
    if (pathname === '/' || pathname === '') {
        pathname = '/index.html';
    }

    let filePath = path.join(ROOT_DIR, pathname);
    if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
        filePath = path.join(PUBLIC_DIR, pathname);
    }

    if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        return res.end('404 Not Found: ' + pathname);
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    // Support HTTP Range requests for video streaming
    const range = req.headers.range;
    if (range && (ext === '.mp4' || ext === '.webm')) {
        const total = fs.statSync(filePath).size;
        const parts = range.replace(/bytes=/, '').split('-');
        const partialStart = parts[0];
        const partialEnd = parts[1];

        const start = parseInt(partialStart, 10);
        const end = partialEnd ? parseInt(partialEnd, 10) : total - 1;
        const chunkSize = (end - start) + 1;

        res.writeHead(206, {
            'Content-Range': `bytes ${start}-${end}/${total}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunkSize,
            'Content-Type': contentType
        });

        const stream = fs.createReadStream(filePath, { start, end });
        return stream.pipe(res);
    }

    res.writeHead(200, {
        'Content-Type': contentType,
        'Content-Length': fs.statSync(filePath).size,
        'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
        'Pragma': 'no-cache',
        'Expires': '0'
    });

    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
});

server.listen(PORT, () => {
    console.log(`\n=============================================================`);
    console.log(`🚀 Kiru's Portfolio Website is running live!`);
    console.log(`🔗 Local URL: http://localhost:${PORT}`);
    console.log(`📂 Root directory: ${ROOT_DIR}`);
    console.log(`🛡️ Dual Variants:`);
    console.log(`   1. Public Viewer Mode (Default - pristine, read-only for visitors)`);
    console.log(`   2. Owner Editor Mode (Click lock/mode pill, PIN: 1234, '+' buttons active)`);
    console.log(`🌐 Ready for GitHub Pages deployment (works statically out of the box)`);
    console.log(`=============================================================\n`);
});
