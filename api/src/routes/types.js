const { Router } = require("express");
const { getTypes } = require("../controllers/controllers");
const { Type } = require("../db");

const router = Router();

router.get("/", async (req, res) => {
  const types = await Type.findAll();
  res.status(200).send(types);
});

module.exports = router;
