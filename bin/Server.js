const http = require('http');
const serverHandler = require('../app.js')
const server = http.createServer(serverHandler);

server.listen(7000);
console.log('OK');