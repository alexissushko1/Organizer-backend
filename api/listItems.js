const express = require("express");
const router = express.Router();
const { authenticate } = require("./auth");
const prisma = require("../prisma");

router.get("/", authenticate, async (req, res, next) => {
  try {
    const listIems = await prisma.listItem.findMany();
    res.json(listItems);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
