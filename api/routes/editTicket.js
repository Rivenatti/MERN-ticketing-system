// Require express router
const userTicketEdit = require("express").Router();

// Require MySQL connection
const MySQLConnection = require("../../config/MySQL");

// Import MySQL queries
const checkIfTicketsTableExistsQuery = require("../MySQL_queries/ticket/checkIfTicketsTableExistsQuery");
const editTicketQuery = require("../MySQL_queries/ticket/editTicketQuery");

// Create route to '/edit/:id'
userTicketEdit.post("/edit/:id", (req, res, next) => {
  // Assign request values to the variables
  const { title, description, status } = req.body;

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
      // edit ticket row in the db
      MySQLConnection.query(
        editTicketQuery(
          req.params.id,
          title,
          description,
          new Date().toISOString(),
          status
        ),
        (err, result) => {
          // Error handling
          if (err) console.log(err);
          else res.status(201).json({ ticket: result });
        }
      );
    }
  });
});

module.exports = userTicketEdit;
