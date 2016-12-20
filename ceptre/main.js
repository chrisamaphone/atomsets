var fs = require('fs')
var http = require("http");

var ok = 200
var plaintext = {'Content-Type': 'text/plain'}

function respond(request, response) {
  response.writeHead(ok, plaintext);
  response.end('Hello world\n');
}

fs.watchFile('log.txt', (curr, prev) => {
  console.log(`the current mtime is: ${curr.mtime}`);
  console.log(`the previous mtime was: ${prev.mtime}`);
});

var port = 8081
var server = http.createServer(respond);
  
server.listen(port);

console.log("Server running at http://127.0.0.1:"+port+"/");
