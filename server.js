const http = require('http');
const fs = require('fs');
const path = require('path');
const dir = path.dirname(require.main.filename);
const mime = { '.html':'text/html', '.css':'text/css', '.js':'application/javascript', '.jsx':'application/javascript' };
http.createServer((req, res) => {
  const p = req.url === '/' ? '/index.html' : req.url;
  const file = path.join(dir, decodeURIComponent(p));
  fs.readFile(file, (err, data) => {
    if (err) { res.writeHead(404); res.end('not found'); return; }
    res.writeHead(200, { 'Content-Type': mime[path.extname(file)] || 'text/plain' });
    res.end(data);
  });
}).listen(5173, () => console.log('listening on 5173'));
