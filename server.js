require("dotenv").config();
const express = require("express");
const app = express();
const PORT = 3000;

const cors = require("cors");
app.use(cors({ origin: "http://localhost:5173" }));

app.use(express.json());

app.use(require("./api/auth").router);
app.use("/my-lists", require("./api/myLists"));
app.use("/list-items", require("./api/listItems"));
app.use("/shopping", require("./api/shopping"));

// Logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});

// 404
app.use((req, res, next) => {
  next({ status: 404, message: "Endpoint not found." });
});

// Error-handling
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status ?? 500);
  res.json(err.message ?? "Sorry, something went wrong :(");
});

app.listen(PORT, () => {
  console.log(`Listening on port#: ${PORT}...`);
});
