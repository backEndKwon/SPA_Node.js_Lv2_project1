
const express = require("express");
const router = express.Router();

router.get("/index", async (req, res) => {
  res.status(200).json({ message: "Hi. I'm Index.js" });
});

module.exports = router;