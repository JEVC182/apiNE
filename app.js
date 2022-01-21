const express = require("express");
const app = express();
const login = require("./routes/auth");
const people = require("./routes/crud");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/login", login);
app.use("/api/people", people);

app.listen(5000, () => {
  console.log("App listening on port 5000");
});
