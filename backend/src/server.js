require('dotenv').config()
require("express-async-errors");
const express = require("express");
const cors = require("cors");
const app = express();

const migrationRun = require("./database/sqlite/migrations");
const routes = require("./routes");
const AppError = require("./utils/appError");

migrationRun();

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(express.json());
app.use(routes);

app.use((err, req, res, next) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: "Error",
      message: err.message,
    });
  }

  console.log(err);

  return res.status(500).json({
    status: "Error",
    message: "Internal server error",
  });
});

app.listen(process.env.PORT, () => console.log(`Server is running on Port ${process.env.PORT}`));
