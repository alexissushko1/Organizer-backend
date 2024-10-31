const express = require("express");
const router = express.Router();

const { authenticate } = require("./auth");
const prisma = require("../prisma");

router.get("/", authenticate, async (req, res, next) => {
  try {
    const myLists = await prisma.myList.findMany({
      // include: { ListItems: true },
    });
    res.json(myLists);
  } catch (e) {
    next(e);
  }
});

router.get("/:id", authenticate, async (req, res, next) => {
  const { id } = req.params;
  try {
    const myList = await prisma.myList.findUniqueOrThrow({
      where: { id: +id },
      // include: { ListItems: true },
    });
    res.json(myList);
  } catch (e) {
    next(e);
  }
});

router.patch("/:id", authenticate, async (req, res, next) => {
  const { id } = req.params;
  const { name, description } = req.body;
  try {
    // Check if the List exists
    const myList = await prisma.myList.findUnique({
      where: { id: +id },
    });
    if (!myList) {
      return next({
        status: 404,
        message: `List with id ${id} does not exist.`,
      });
    }

    // Update the List
    const updatedList = await prisma.myList.update({
      where: { id: +id },
      data: { name, description },
    });
    res.json(updatedList);
  } catch (e) {
    next(e);
  }
});

router.post("/", authenticate, async (req, res, next) => {
  const { name, description, listIds, ownerId } = req.body;
  try {
    const ListItems = listIds.map((id) => ({ id }));
    const myList = await prisma.myList.create({
      data: {
        name,
        description,
        ownerId,
        listItems: { connect: ListItems },
      },
    });
    res.status(201).json(myList);
  } catch (e) {
    next(e);
  }
});

router.delete("/:id", authenticate, async (req, res, next) => {
  const { id } = req.params;

  try {
    // Check if the List exists
    const myList = await prisma.myList.findUnique({
      where: { id: +id },
    });
    if (!myList) {
      return next({
        status: 404,
        message: `List with id ${id} does not exist.`,
      });
    }
    // await prisma.myList.deleteMany({
    //   where: { listItemId: +id },
    // });

    // Delete the list
    await prisma.myList.delete({
      where: { id: +id },
    });
    res.sendStatus(204);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
