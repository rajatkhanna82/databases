/*jshint multistr: true */

var mysql = require('mysql');
/* If the node mysql module is not found on your system, you may
 * need to do an "sudo npm install -g mysql". */

/* You'll need to fill the following out with your mysql username and password.
 * database: "chat" specifies that we're using the database called
 * "chat", which we created by running schema.sql.*/
var dbConnection = mysql.createConnection({
  user: "root",
  password: "",
  database: "chat"
});

dbConnection.connect();
/* Now you can make queries to the Mysql database using the
 * dbConnection.query() method.
 * See https://github.com/felixge/node-mysql for more details about
 * using this module.*/

/* You already know how to create an http server from the previous
 * assignment; you can re-use most of that code here. */
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

// Include mysql
var mysql = require('mysql');

// Start server
var server = http.createServer(app);

// Listen to port 8080
server.listen(8080);
var dbConnection;
var tablenames = ['rooms', 'users', 'messages', 'relationships'];

var url = require('url');


app.get('/classes/room1', function(req, res) {
  var pathname = url.parse(req.url).pathname;
  console.log(pathname)
  console.log('GET+=========+++++===========')
  dbConnection = mysql.createConnection({
    user: 'root',
    password: '',
    database: 'chat'
  });
  dbConnection.connect();

  var queryString = "\
    SELECT text\
      FROM messages m\
        JOIN users ON m.userid = users.id\
        JOIN rooms ON m.roomid = rooms.id\
      WHERE\
            users.name = ?\
        AND rooms.name = ?;\
  ";

  // queryString = 'SELECT * FROM messages;';

  // queryString = "INSERT INTO messages (userid,text,roomid,createdAt) VALUES (2,'sup world',1,7923574);";

  var queryArgs = [username, roomname];

  dbConnection.query(queryString, queryArgs, function(err, results, fields) {
      console.error(err);
      console.log("results", results);
      console.log("fields", fields);
    });
});













