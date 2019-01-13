// Require express router
const addMessage = require("express").Router();

// Require MySQL connection
const MySQLConnection = require("../../config/MySQL");

// Require authentication middleware
const checkAuth = require("../../middleware/checkAuth");

// Import MySQL queries
const checkIfMessagesTableExistsQuery = require("../MySQL_queries/message/checkIfMessagesTableExistsQuery");
const insertMessageQuery = require("../MySQL_queries/message/insertMessageQuery");

// Create route to '/addMessage'
addMessage.post("/addMessage", checkAuth, (req, res, next) => {
  // Assign request values to the variables
  const { userID, ticketID, message, date } = req.body;

  // Check if all required fields are filled in
  if (!message)
    return res.status(400).json({ message: "Message field is empty." });

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
      // Create new message object
      const newMessage = {
        userID,
        ticketID,
        message,
        date
      };

      // Insert new message to the db
      MySQLConnection.query(insertMessageQuery, newMessage, (err, result) => {
        // Error handling
        if (err) res.status(500).json({ message: err });
        else res.status(201).json({ message: "Message has been created." });
      });
    }
  });
});

module.exports = addMessage;
