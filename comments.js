// Create web server
// Run server with node comments.js
// View in browser at http://localhost:3000

var express = require('express');
var app = express();
var fs = require('fs');

// Enable CORS
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

// Enable JSON
app.use(express.bodyParser());
app.use(express.methodOverride());

// Set up routes
app.get('/comments', function(req, res) {
  console.log("GET /comments");
  fs.readFile('comments.json', function(err, data) {
    res.setHeader('Content-Type', 'application/json');
    res.send(data);
  });
});

app.post('/comments', function(req, res) {
  console.log("POST /comments");
  fs.readFile('comments.json', function(err, data) {
    var comments = JSON.parse(data);
    comments.push(req.body);
    fs.writeFile('comments.json', JSON.stringify(comments, null, 4), function(err) {
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(comments));
    });
  });
});

app.listen(3000);
console.log('Server started: http://localhost:3000/');
