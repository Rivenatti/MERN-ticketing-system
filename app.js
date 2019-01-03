//----- App initialization
const express = require("express");
const app = express();
const path = require("path");

//----- Serve static files from the React App
app.use(express.static(path.join(__dirname, "client/build")));

//----- Morgan HTTP request logger middleware
const morgan = require("morgan");
app.use(morgan("dev"));

// Enable cookie parsing
const cookieParser = require("cookie-parser");
app.use(cookieParser());

//----- Enable body parsing of incoming requests
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//----- Cross-Origin Resource Sharing
app.use((req, res, next) => {
  res.header("Access-Controll-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, PATCH, DELETE");
    return res.status(200).json({});
  }
  next();
});

//----- Routing

// Homepage route
app.get("/", (req, res) => res.send("Home"));

// Login route
const loginRoute = require("./api/routes/login");
app.use("/", loginRoute);

// Register route
const registerRoute = require("./api/routes/register");
app.use("/", registerRoute);

// Create ticket route
const createTicketRoute = require("./api/routes/createTicket");
app.use("/", createTicketRoute);

// Get user tickets route
const getUserTicketsRoute = require("./api/routes/getUserTickets");
app.use("/", getUserTicketsRoute);

//----- Error handling routes
app.use((req, res, next) => {
  const error = new Error("Error 404: Page not found.");
  error.status = 404;
  next(error);
});

app.use((error, req, res) => {
  res.status(error.status || 500);
  res.json({ error: { message: error.message } });
});

//----- Heroku server
if (process.env.NODE_ENV !== "development") {
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/client/build/index.html"));
  });
}

module.exports = app;
