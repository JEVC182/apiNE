const express = require("express");
const app = express();
const people = require("./mockData/peopleData");

app.use(express.json());
app.get("/api/people", (req, res) => {
  res.status(200).json({ success: true, data: people });
});

app.listen(5000, () => {
  console.log("App listening on port 5000");
});
