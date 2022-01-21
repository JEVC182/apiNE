const express = require("express");
const router = express.Router();
const people = require("../mockData/peopleData");

router.get("/", (req, res) => {
  res.status(200).json({ success: true, data: people });
});

router.post("/", (req, res) => {
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

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const singlePerson = people.find((person) => person.id === Number(id));
  if (!singlePerson) {
    return res
      .status(404)
      .json({ success: false, message: `Not user with id ${id} was found` });
  }
  res.json({ success: true, data: singlePerson });
});
router.put("/:id", (req, res) => {
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
router.delete("/:id", (req, res) => {
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

module.exports = router;
