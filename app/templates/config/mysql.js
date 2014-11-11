'use strict';
module.exports = function() {
  var mysql = require('mysql2');

  // var connections = mysql.createPool({
  //     connectionLimit: 10,
  //     user: 'api',
  //     host: '146.185.190.96',
  //     password: 'ftHwcvzM5QhH8MPb',
  //     database: 'ililcemahalle'
  // });
  var connections = mysql.createPool({
    connectionLimit: 10,
    user: 'root',
    host: '127.0.0.0',
    password: '',
    database: 'turkey'
  });
  //connection.connect();

  connections.on('error', function(err) {
    console.log(arguments);
  });

  return connections;
};
