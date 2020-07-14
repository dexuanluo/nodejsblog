const http = require('http');
const serverHandler = require('../app.js')
const server = http.createServer(serverHandler);
const port = 7000
server.listen(port);
console.log('Server OK, listening on ', port);