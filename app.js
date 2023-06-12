const express = require("express");
require("dotenv").config();

const app = express();
app.use(express.json());

const port = process.env.APP_PORT ?? 5000;

const welcome = (req, res) => {
  res.send("Welcome to my favourite movie list");
};

const userHandlers = require("./userHandlers");
const { hashPassword, verifyPassword } = require("./auth");

app.get("/", welcome);

const movieHandlers = require("./movieHandlers");
const { hashPassword } = require("./auth.js");
const { hashPassword, verifyPassword, verifyToken } = require("./auth");

app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);
app.get("/api/users", userHandlers.getUsers);
app.get("/api/users/:id", userHandlers.getUserById);

app.post(
  "/api/login",
  userHandlers.getUserByEmailWithPasswordAndPassToNext,
  verifyPassword
);
app.use(verifyToken);
app.post("/api/movies", verifyToken, movieHandlers.postMovie);
app.put("/api/movies/:id",verifyToken, movieHandlers.updateMovie);
app.delete("/api/movies/:id",verifyToken, movieHandlers.deleteMovie);
app.post("/api/movies", verifyToken, movieHandlers.postMovie);



app.post("/api/users", verifyToken, hashPassword, userHandlers.postUser);
app.put("/api/users/:id", verifyToken, hashPassword, userHandlers.updateUser);



app.post("/api/users", verifyToken, userHandlers.postUser);
app.put("/api/users/:id",verifyToken, userHandlers.updateUser);
app.delete("/api/users/:id", verifyToken, userHandlers.deleteUser);

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
