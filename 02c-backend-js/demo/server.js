var http = require('http');

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World!');
    console.log('Request processed');
}).listen(8080);
console.log('Listening on http://localhost:8080');