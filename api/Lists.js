const express = require("express");
const router = express.Router();

const { authenticate } = require("./auth");
const prisma = require("../prisma");

router.get("/", authenticate, async (req, res, next) => {
  try {
    const MyLists = await prisma.list.findMany({
      include: { ListItems: true },
    });
    res.json(MyLists);
  } catch (e) {
    next(e);
  }
});

router.get("/:id", authenticate, async (req, res, next) => {
  const { id } = req.params;
  try {
    const MyList = await prisma.MyList.findUniqueOrThrow({
      where: { id: +id },
      include: { ListItems: true },
    });
    res.json(MyList);
  } catch (e) {
    next(e);
  }
});

router.put("/:id", authenticate, async (req, res, next) => {
  const { id } = req.params;
  const { name, description } = req.body;
  try {
    // Check if the List exists
    const MyList = await prisma.MyList.findUnique({
      where: { id: +id },
    });
    if (!MyList) {
      return next({
        status: 404,
        message: `List with id ${id} does not exist.`,
      });
    }

    // Update the List
    const updatedList = await prisma.MyList.update({
      where: { id: +id },
      data: { name, description },
    });
    res.json(updatedList);
  } catch (e) {
    next(e);
  }
});

router.post("/", authenticate, async (req, res, next) => {
  const { name, description } = req.body;
  try {
    const listItems = listIds.map((id) => ({ id }));
    const MyList = await prisma.MyList.create({
      data: {
        name,
        description,
        listItem: { connect: listItems },
      },
    });
    res.status(201).json(MyList);
  } catch (e) {
    next(e);
  }
});

router.delete("/:id", authenticate, async (req, res, next) => {
  const { id } = req.params;

  try {
    // Check if the List exists
    const MyList = await prisma.MyList.findUnique({
      where: { id: +id },
    });
    if (!MyList) {
      return next({
        status: 404,
        message: `List with id ${id} does not exist.`,
      });
    }
    await prisma.ListItems.updateMany({
      where: { DepartmentId: +id },
      data: { DepartmentId: null },
    });

    // Delete the list
    await prisma.MyList.delete({ where: { id: +id } });
    res.sendStatus(204);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
