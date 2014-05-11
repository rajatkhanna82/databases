var express = require('express');
var app = express();
var bodyParse = require('body-parser');
// Use static middleware
// app.configure(function () {
app.use(bodyParse.json({type: 'application/json'}));
app.use(function(req, res, next) {
  console.log(req.body)
  next();
});
app.use(express.static(__dirname + '/public'));
// });

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

console.log('before sequelizing')

// Sequelize code ===============================================================================
var Room = require('../ORM_Refactor/orm-example.js').Room;
console.log('room')
var User = require('../ORM_Refactor/orm-example.js').User;
console.log('user')
var Message = require('../ORM_Refactor/orm-example.js').Message;
console.log('msg')


app.get('/classes/chatterbox', function(req, res) {
  // get messages from db and put into a {results: messages} format and send it
  Message.findAll().success(function(messages) {
    console.log("messages", messages);
    res.send({results: messages});
  });
});

app.post('/classes/chatterbox', function(req, res) {
  console.log(req.body);
  Room
    .findOrCreate({name: req.body.roomname})
    .success(function(room){
    console.log('=========================', room.id)
    User
      .findOrCreate({name: req.body.username})
      .success(function(user){
      Message
        .create({text: req.body.text, userId: user.id, roomId: room.id})
        .success(function(){
          res.end();
        });
      });
    });
});



// Pre-database code===========================
// var messages = [];
// var idCounter = 1;


// SQL (first pass) code =================================================================
/*
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
*/













