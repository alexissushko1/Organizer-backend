const express = require("express");
const router = express.Router();
const { authenticate } = require("./auth");

const items = require("../walmartApi/data/items");

router.get("/items", authenticate, async (req, res, next) => {
  try {
    res.json(items);
  } catch (e) {
    next(e);
  }
});

// Calculate cart total based on selected items
router.post("/cart", authenticate, async (req, res, next) => {
  const { selectedItems } = req.body; // Expect an array of selected item IDs
  try {
    let total = 0;

    selectedItems.forEach((itemId) => {
      const item = items.find((i) => i.id === itemId);
      if (item && item.inStock) {
        total += item.price;
      }
    });

    res.json({ total });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
