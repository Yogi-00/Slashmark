const express = require("express");
const app = express();
// const cors = require("cors");
const port = 5000;

// mongoose.set("strictQuery", false);
// mongoose.set("strictQuery", true);
const mongoDb = require("./db");
mongoDb();

// app.use(cors());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-with, Content-Type, Accept"
  );
  next();
});

// const { default: mongoose } = require("mongoose");

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use(express.json()); //doubt
app.use("/api", require("./Routes/CreateUser"));
app.use("/api", require("./Routes/DisplayData"));
app.use("/api", require("./Routes/OrderData"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
