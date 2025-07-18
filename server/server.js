require("dotenv").config();

const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// create express app
const app = express();
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://main.d2xotiz8jub08m.amplifyapp.com",
    ], // allow requests from this domain
    credentials: true,
  })
);
app.listen(process.env.EXPRESS_PORT, () => {
  console.log("Server is listening on port", process.env.EXPRESS_PORT);
});

const ingredients_route = require("./routes/ingredientsService.js");
const user_route = require("./routes/userService.js");
const recipe_route = require("./routes/generateRecipe.js");
const recipes_route = require("./routes/recipesService.js");

// middleware that will trigger for every request that comes in\
app.use(express.json()); // if any requests come in, parse json data from request body and attach to request object
app.use(cookieParser());
app.use((req, res, next) => {
  console.log(`${req.path}, ${req.method}`); // log the path and method of each request
  next(); // move on to the next middleware
});

// routes
app.use("/ingredients", ingredients_route); // route for ingredients service
app.use("/users", user_route); // route for user service
app.use("/recipe", recipe_route); // route for user service
app.use("/recipes", recipes_route); // route for user service

// root route for testing if backend is running
app.get("/", (req, res) => {
  res.send(`
    <h2>✅ Backend is running</h2>
    <p>Example account:</p>
    <ul>
      <li>Email: <code>demo@example.com</code></li>
      <li>Password: <code>password123</code></li>
    </ul>
  `);
});

console.log("Available /users routes:");
user_route.stack.forEach((r) => {
  if (r.route && r.route.path) {
    console.log(
      ` - ${r.route.stack[0].method.toUpperCase()} /users${r.route.path}`
    );
  }
});
