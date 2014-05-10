var express = require('express');
var app = express();

// Use static middleware
app.use(express.static(__dirname + '/public'));

// Set the view engine
var jade = require('jade');
app.set('view engine', 'jade');

// Set the directory that contains the views
app.set('views', __dirname + '/views');

// app.use(function(req, res, next){ // 404 handling
//   res.send(404, 'page not found');
// });

// Create HTTP server with your app
var http = require('http');
var server = http.createServer(app)

// Listen to port 8080
server.listen(3000);

// ==============================================

app.get('/', function(req, res) {
  res.render('index');
});

// var messages = [];
// var idCounter = 1;
var db = require('./db-helpers');

app.get('/classes/chatterbox', function(req, res) {
  // get messages from db and put into a {results: messages} format and send it
  db.getAllMessages(function(data){
    console.log(data);
    res.send({results: data});
  });
});

app.post('/classes/chatterbox', function(req, res) {
  var body = '';
  req.on('data', function(data) {
    body += data;
  });
  req.on('end', function() {
    var message = JSON.parse(body);
    message.createdAt = Date.now('YYYY-MM-DD HH:MM:SS');
    console.log('posting');
    db.postMessage(message, function() {
      console.log('post complete');
    });
    res.status = 201;
    res.end();
  });
});













