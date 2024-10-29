const express = require("express");
const router = express.Router();
const { authenticate } = require("./auth");
const prisma = require("../prisma");

router.get("/", authenticate, async (req, res, next) => {
  try {
    const listItems = await prisma.listItem.findMany();
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
        myList: { connect: myLists },
      },
    });
    res.status(201).json(listItems);
  } catch (e) {
    next(e);
  }
});

router.get("/:id", authenticate, async (req, res, next) => {
  const { id } = req.params;
  try {
    const listItem = await prisma.listItem.findUniqueOrThrow({
      where: { id: +id },
      include: { myLists: true },
    });
    res.json(listItem);
  } catch (e) {
    next(e);
  }
});
router.put("/:id", authenticate, async (req, res, next) => {
  const { id } = req.params;
  const { name, myListId } = req.body;

  try {
    const listItem = await prisma.listItem.findUniqueOrThrow({
      where: { id: +id },
    });
    if (!listItem) {
      return next({
        status: 404,
        message: `ListItem ${id} does not exist`,
      });
    }

    const updateData = {};
    if (name) updateData.name = name;
    if (myListId) updateData.myListId = +myListId;

    const updatedListItem = await prisma.listItem.update({
      where: { id: +myListId },
      data: updateData,
    });
    res.json(updatedListItem);
  } catch (e) {
    next(e);
  }
});

router.delete("/:id", authenticate, async (req, res, next) => {
  const { id } = req.params;
  try {
    const listItem = await prisma.listItem.findUniqueOrThrow({
      where: { id: +id },
    });
    await prisma.listItem.delete({ where: { id: +id } });
    res.sendStatus(204);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
