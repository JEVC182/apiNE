const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  const { user } = req.body;

  if (!user) {
    return res
      .status(400)
      .json({ success: false, message: `Please provide a valid user name` });
  }
  return res.status(200).json({ success: true, message: `Welcome ${user}` });
});

module.exports = router;
