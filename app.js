const express = require("express");
const app = express();
const people = require("./mockData/peopleData");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.get("/api/people", (req, res) => {
  res.status(200).json({ success: true, data: people });
});
app.get("/api/people/:id", (req, res) => {
  const { id } = req.params;
  const singlePerson = people.find((person) => person.id === Number(id));
  if (!singlePerson) {
    return res
      .status(404)
      .json({ success: false, message: `Not user with id ${id} was found` });
  }
  res.json({ success: true, data: singlePerson });
});
app.listen(5000, () => {
  console.log("App listening on port 5000");
});
