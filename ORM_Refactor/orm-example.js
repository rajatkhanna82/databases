/* You'll need to
 * npm install sequelize
 * before running this example. Documentation is at http://sequelizejs.com/
 */

var exports = exports; // make linter happy

var Sequelize = require('sequelize');
console.log('sequilizing imported')
var sequelize = new Sequelize('chat', 'root', '');
/* TODO this constructor takes the database name, username, then password.
 * Modify the arguments if you need to */

/* first define the data structure by giving property names and datatypes
 * See http://sequelizejs.com for other datatypes you can use besides STRING. */
var User = sequelize.define('users', {
  name: Sequelize.STRING,
});

var Room = sequelize.define('rooms', {
  name: Sequelize.STRING,
});

var Message = sequelize.define('messages', {
  text: Sequelize.STRING
});

Message.belongsTo(Room);
Message.belongsTo(User);

/* .sync() makes Sequelize create the database table for us if it doesn't
 *  exist already: */
Room.sync();
User.sync();
Message.sync();

  /* This callback function is called once sync succeeds. */

  // now instantiate an object and save it:
  // var newUser = User.build({user_name: 'davis'});
  // newUser.save().success(function() {

  //   /* This callback function is called once saving succeeds. */

  //   // Retrieve objects from the database:
  //   User.findAll({ where: {user_name: 'davis'} }).success(function(usrs) {
  //     // This function is called back with an array of matches.
  //     for (var i = 0; i < usrs.length; i++) {
  //       console.log(usrs[i].user_name + ' exists');
  //     }
    // });
  // });



exports.User = User;
exports.Room = Room;
exports.Message= Message;
