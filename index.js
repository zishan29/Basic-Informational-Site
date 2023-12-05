const http = require('http');
const fs = require('fs');

http
  .createServer((req, res) => {
    let filePath = `.${req.url}`;

    if (filePath === './') {
      filePath = './index.html';
    } else if (filePath === './about') {
      filePath = './about.html';
    } else if (filePath === './contact-me') {
      filePath = './contact-me.html';
    } else {
      filePath = './404.html';
    }

    fs.readFile(filePath, (err, content) => {
      if (err) {
        if (err.code === 'ENOENT') {
          fs.readFile('./404.html', (err, content) => {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end(content, 'utf-8');
          });
        } else {
          res.writeHead(500);
          res.end(`Server Error: ${err.code}`);
        }
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(content, 'utf-8');
      }
    });
  })
  .listen(8080);
