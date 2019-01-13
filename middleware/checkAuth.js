const jwt = require("jsonwebtoken");
const JWT_KEY = require("../config/JWT_Secret");

module.exports = (req, res, next) => {
  const decoded = jwt.verify(req.cookies.token, JWT_KEY);

  // Token decoded data
  let d_userID = decoded.userID;
  let d_userRole = decoded.role;

  // Request data
  let r_userID = req.body.userID;

  try {
    switch (req._parsedUrl.path.split("/")[1]) {
      // Change ticket status
      case "changeStatus": {
        return d_userRole === "admin" && next();
      }

      // Create new ticket
      case "createTicket": {
        return d_userRole === "user" && next();
      }

      // Delete user account
      case "deleteUser": {
        return d_userID === r_userID && next();
      }

      // Delete ticket
      case "delete": {
        return d_userID === r_userID && next();
      }

      // Edit ticket
      case "edit": {
        return d_userID === r_userID && next();
      }

      // Get all tickets
      case "getTickets": {
        return d_userRole === "admin" && next();
      }

      // Get single ticket
      case "get": {
        return d_userID === r_userID && next();
      }

      // Get user
      case "getUser": {
        return d_userRole === "admin" && next();
      }

      // Get all user's tickets
      case "getUserTickets": {
        return d_userID === r_userID && next();
      }

      // Add new message
      case "addMessage": {
        return (d_userID === r_userID || d_userRole === "admin") && next();
      }

      // Add new message
      case "getMessages": {
        return (d_userID === r_userID || d_userRole === "admin") && next();
      }

      default:
        return res.status(402).json({ message: "Auth failed" });
    }

    next();
  } catch (err) {
    return res.status(402).json({ message: "Auth failed" });
  }
};
