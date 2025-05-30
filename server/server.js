require("dotenv").config();

const express = require("express");
const cors = require("cors");

// create express app
const app = express();
app.use(
  cors({
    origin: "http://localhost:3000", // allow requests from this domain
  })
);
app.listen(process.env.EXPRESS_PORT, () => {
  console.log("Server is listening on port", process.env.EXPRESS_PORT);
});

const ingredients_route = require("./routes/ingredientsService.js");
const user_route = require("./routes/userService.js");

// middleware that will trigger for every request that comes in\
app.use(express.json()); // if any requests come in, parse json data from request body and attach to request object
app.use((req, res, next) => {
  console.log(`${req.path}, ${req.method}`); // log the path and method of each request
  next(); // move on to the next middleware
});

// routes
app.use("/ingredients", ingredients_route); // route for ingredients service
app.use("/users", user_route); // route for user service
