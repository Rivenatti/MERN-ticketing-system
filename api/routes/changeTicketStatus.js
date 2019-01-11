// Require express router
const changeTicketStatus = require("express").Router();

// Require MySQL connection
const MySQLConnection = require("../../config/MySQL");

// Require authentication middleware
const checkAuth = require("../../middleware/checkAuth");

// Import MySQL queries
const checkIfTicketsTableExistsQuery = require("../MySQL_queries/ticket/checkIfTicketsTableExistsQuery");
const changeTicketStatusQuery = require("../MySQL_queries/ticket/changeTicketStatusQuery");

// Create route to '/changeStatus/:id'
changeTicketStatus.post("/changeStatus/:id", checkAuth, (req, res, next) => {
  // Check if tickets table exists in the database
  MySQLConnection.query(checkIfTicketsTableExistsQuery, (err, result) => {
    // Error handling
    if (err) res.status(500).json({ message: err });
    // If tickets table doesn't exist, throw error message
    else if (result.length === 0) {
      res
        .status(400)
        .json({ message: "Tickets table doesn't exist in the database." });
    } else {
      // changeTicketStatus
      MySQLConnection.query(
        changeTicketStatusQuery(req.params.id, req.body.status),
        (err, result) => {
          // Error handling
          if (err) console.log(err);
          else res.status(201).json({ ticket: result });
        }
      );
    }
  });
});

module.exports = changeTicketStatus;
