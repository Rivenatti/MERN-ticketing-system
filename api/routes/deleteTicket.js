// Require express router
const userTicketDelete = require("express").Router();

// Require MySQL connection
const MySQLConnection = require("../../config/MySQL");

// Import MySQL queries
const checkIfTicketsTableExistsQuery = require("../MySQL_queries/ticket/checkIfTicketsTableExistsQuery");
const deleteTicketQuery = require("../MySQL_queries/ticket/deleteTicketQuery");

// Create route to '/delete/:id'
userTicketDelete.post("/delete/:id", (req, res, next) => {
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
      // delete ticket from the db
      MySQLConnection.query(deleteTicketQuery(req.params.id), (err, result) => {
        // Error handling
        if (err) console.log(err);
        else res.status(201).json({ ticket: result });
      });
    }
  });
});

module.exports = userTicketDelete;
