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

router.post("/", authenticate, async (req, res, next) => {
  const { item, myListId } = req.body;
  try {
    const myLists = myListIds.map((id) => ({ id }));
    const listItems = await prisma.listItem.create({
      data: {
        item,
        myListId,
        myLists: { connect: myLists },
      },
    });
    res.status(201).json(listItem);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
