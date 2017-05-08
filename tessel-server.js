var http = require('http');

var server = http.createServer(function(req, res) {
    res.writeHead(200, {"Content-Type": "text/plain"});
    res.end('Hello, world');
}).listen(1337);

// IP = 192.168.6.128