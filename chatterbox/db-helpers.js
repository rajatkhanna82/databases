/*jshint multistr: true */

var exports = exports; // make linter happy
var require = require;
var mysql = require('mysql');

exports.getAllMessages = function(callback) {

  var dbConnection = openConnection();

  var queryString = '\
    SELECT\
      m.id AS objectId,\
      users.name AS username,\
      m.text,\
      rooms.name AS roomname,\
      m.createdAt\
    FROM messages m\
      JOIN users ON m.userid = users.id\
      JOIN rooms ON m.roomid = rooms.id';

  dbConnection.query(queryString, function(err, results) {
    if(err) {
      console.error(err);
    }
    callback(results);
  });

  dbConnection.end();
};

exports.addRoom = function(roomname, callback) {
  var dbConnection = openConnection();

  var queryString = '\
    INSERT INTO rooms (name)\
    SELECT * FROM (SELECT ?) AS tmp\
    WHERE NOT EXISTS (\
      SELECT name FROM rooms WHERE name = ?\
    ) LIMIT 1;\
  ';

  var queryArgs = [roomname, roomname];

  dbConnection.query(queryString, queryArgs, function(err, results) {
    if(err) {
      console.error(err);
    } else {
      callback();
    }
  });
};

exports.addUser = function(username, callback) {
  var dbConnection = openConnection();

  var queryString = '\
    INSERT INTO users (name)\
    SELECT * FROM (SELECT ?) AS tmp\
    WHERE NOT EXISTS (\
      SELECT name FROM users WHERE name = ?\
    ) LIMIT 1;\
  ';

  var queryArgs = [username, username];

  dbConnection.query(queryString, queryArgs, function(err, results) {
    if(err) {
      console.error(err);
    } else {
      callback();
    }
  });
};

exports.addMessage = function(message, callback) {
  var dbConnection = openConnection();

  var queryString = '\
    INSERT INTO messages(\
      userid,\
      roomid,\
      text,\
      createdAt)\
    VALUES (\
      (SELECT id FROM users WHERE name = ?),\
      (SELECT id FROM rooms WHERE name = ?),\
      ?,\
      ?)\
  ';

  var queryArgs = [message.username, message.roomname, message.text, message.createdAt];
  console.log(queryArgs);

  dbConnection.query(queryString, queryArgs, function(err, results) {
    if(err) {
      console.error(err);
    } else {
      if(callback) {
        callback();
      }
    }
  });
};

exports.postMessage = function(message, callback) {
  exports.addRoom(message.roomname, function() {
    exports.addUser(message.username, function() {
      exports.addMessage(message);
    });
  });
};

var openConnection = function() {
  var dbConnection = mysql.createConnection({
    user: 'root',
    password: '',
    database: 'chat'
  });

  dbConnection.connect();

  return dbConnection;
};
