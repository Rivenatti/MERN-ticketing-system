if (process.env.NODE_ENV === "development") {
  MySQL_config = require("./config").MySQL_config;
} else {
  //----- MySQL config
  MySQL_config = process.env.MySQL_config;
}

// Require mysql
const mysql = require("mysql");

// Import MySQL queries
const checkIfUsersTableExistsQuery = require("../api/MySQL_queries/registration/checkIfUsersTableExistsQuery");
const createUsersTableQuery = require("../api/MySQL_queries/registration/createUsersTableQuery");

const checkIfTicketsTableExistsQuery = require("../api/MySQL_queries/ticket/checkIfTicketsTableExistsQuery");
const createTicketsTableQuery = require("../api/MySQL_queries/ticket/createTicketsTableQuery");

const checkIfMessagesTableExistsQuery = require("../api/MySQL_queries/message/checkIfMessagesTableExistsQuery");
const createMessagesTableQuery = require("../api/MySQL_queries/message/createMessagesTableQuery");

// Connection settings
const MySQLConnection = mysql.createConnection(MySQL_config);

// Create connection
MySQLConnection.connect(err => {
  if (err) console.log("MySQL Error: " + err);
  else console.log("MySQL connected...");
});

// Check if users table exists in the database
MySQLConnection.query(checkIfUsersTableExistsQuery, (err, result) => {
  // Error handling
  if (err) console.log("Error " + err);
  // If users table doesn't exist, create one
  else if (result.length === 0) {
    MySQLConnection.query(createUsersTableQuery, (err, response) => {
      if (err) console.log("MySQL Error: " + err);
      else console.log("Users table has been created successfully...");
    });
  }
});

// Check if tickets table exists in the database
MySQLConnection.query(checkIfTicketsTableExistsQuery, (err, result) => {
  // Error handling
  if (err) console.log("Error " + err);
  // If tickets table doesn't exist, create one
  else if (result.length === 0) {
    MySQLConnection.query(createTicketsTableQuery, (err, response) => {
      if (err) console.log("MySQL Error: " + err);
      else console.log("Tickets table has been created successfully...");
    });
  }
});

// Check if messages table exists in the database
MySQLConnection.query(checkIfMessagesTableExistsQuery, (err, result) => {
  // Error handling
  if (err) console.log("Error " + err);
  // If messages table doesn't exist, create one
  else if (result.length === 0) {
    MySQLConnection.query(createMessagesTableQuery, (err, response) => {
      if (err) console.log("MySQL Error: " + err);
      else console.log("Messages table has been created successfully...");
    });
  }
});

// Refresh connection every 4 minutes
function refreshConnection() {
  MySQLConnection.query("select 1", [], function(err, result) {
    if (err) console.log("MySQL Error: " + err);
  });
}
setInterval(refreshConnection, 1000 * 60 * 4);

// MySQL server timeout error
MySQLConnection.on("error", err => console.log("MySQL connection timeout."));

module.exports = MySQLConnection;
