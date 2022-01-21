const express = require("express");
const app = express();
const people = require("./mockData/peopleData");
const login = require("./routes/auth");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/login", login);

app.get("/api/people", (req, res) => {
  res.status(200).json({ success: true, data: people });
});

app.post("/api/people", (req, res) => {
  const { id, first_name, last_name, email } = req.body;

  if (!first_name || !last_name || !email) {
    return res
      .status(400)
      .json({ success: true, message: `Please provide valid data` });
  }

  return res.status(201).json({
    success: true,
    data: [...people, { id, first_name, last_name, email }],
  });
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
app.put("/api/people/:id", (req, res) => {
  const { id } = req.params;
  const { email } = req.body;
  const person = people.find((person) => person.id === Number(id));
  if (!person) {
    return res.status(404).json({
      success: false,
      message: `Could not found a user with id ${id}`,
    });
  }
  const updatedPerson = people.map((person) => {
    if (person.id === Number(id)) {
      person.email = email;
    }
    return person;
  });
  res.status(200).json({ success: true, data: updatedPerson });
});
app.delete("/api/people/:id", (req, res) => {
  const { id } = req.params;
  const person = people.find((person) => person.id === Number(id));

  if (!person) {
    return res.status(404).json({
      success: false,
      message: `Could not found a user with id ${id}`,
    });
  }
  const deletedPerson = people.filter((person) => person.id !== Number(id));

  return res
    .status(200)
    .json({ success: true, lenght: deletedPerson.length, data: deletedPerson });
});
app.listen(5000, () => {
  console.log("App listening on port 5000");
});
