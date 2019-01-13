// Require express router
const getMessages = require("express").Router();

// Require MySQL connection
const MySQLConnection = require("../../config/MySQL");

// Require authentication middleware
const checkAuth = require("../../middleware/checkAuth");

// Import MySQL queries
const checkIfMessagesTableExistsQuery = require("../MySQL_queries/message/checkIfMessagesTableExistsQuery");
const getMessagesQuery = require("../MySQL_queries/message/getMessagesQuery");

// Create route to '/get/:id'
getMessages.post("/getMessages/:id", checkAuth, (req, res, next) => {
  // Check if messages table exists in the database
  MySQLConnection.query(checkIfMessagesTableExistsQuery, (err, result) => {
    // Error handling
    if (err) res.status(500).json({ message: err });
    // If messages table doesn't exist, throw error message
    else if (result.length === 0) {
      res
        .status(400)
        .json({ message: "Messages table doesn't exist in the database." });
    } else {
      // Get message data from the db
      MySQLConnection.query(getMessagesQuery(req.params.id), (err, result) => {
        // Error handling
        if (err) res.status(500).json({ message: err });
        else res.status(201).json({ messages: result });
      });
    }
  });
});

module.exports = getMessages;
