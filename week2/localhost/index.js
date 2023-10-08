import http from 'http';
import fs from 'fs';

function serveStatic(res, path, contentType, responseCode){
  if(!responseCode) responseCode = 200;
  console.log(__dirname + path)
  fs.readFile(__dirname + path, function(err, data){
      if(err){
        res.writeHead(500, {'Content-Type': 'text/plain'});
        res.end('Internal Server Error');
      }
      else{
        res.writeHead(responseCode, {'Content-Type': contentType});
        res.end(data);
      }
  });
}

http.createServer(function(req,res){
  console.log('createServer got request')
  var path = req.url.toLowerCase();
  switch(path) {
    case '/': 
      serveStatic(res, '/../public/home.html', 'text/html');
      break;
    case '/about':
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end('Welcome to the about me page! My name is Bryan Gomez and I am an iOS Developer with 2 years of experience. I like to hike, gym, and hang out with my friends on my free time!');
      break;
    default:
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.end('404:Page not found.');
  }
  
}).listen(process.env.PORT || 3001); // change this to 3001 since I could not get the other channel to stop. 
console.log('after createServer')