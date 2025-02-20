const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");
const  User = require("../models/User");
const Product = require("../models/Product");

router.post("/add", async (req, res) => {
  try {
    console.log("Request Body:", req.body);

    const { userId, productId, quantity } = req.body;
    console.log("hi",userId,productId);
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let cartItem = await Cart.findOne({ where: { userId, productId } });

    if (cartItem) {
      cartItem.quantity += quantity;
      await cartItem.save();
    } else {
      cartItem = await Cart.create({ userId, productId, quantity });
    }

    res.status(200).json({ message: "Product added to cart", cartItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/:userId", async (req, res) => {
  try {
      console.log("Request Params:", req.params); // Debugging log
      const { userId } = req.params;

      if (!userId) {
          return res.status(400).json({ message: "User ID is required" });
      }

      const cartItems = await Cart.findAll({ where: { userId }, include: [Product] });
      res.status(200).json(cartItems);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
  }
});
router.get("/", async (req, res) => {
  try {
    const allCarts = await Cart.findAll({ include: [User, Product] });
    res.status(200).json(allCarts);
  } catch (error) {
    console.error("Error fetching all carts:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

  
  router.put("/update", async (req, res) => {
    try {
      const { userId, productId, quantity } = req.body;
      let cartItem = await Cart.findOne({ where: { userId, productId } });
  
      if (!cartItem) {
        return res.status(404).json({ message: "Cart item not found" });
      }
  
      cartItem.quantity = quantity;
      await cartItem.save();
      res.status(200).json({ message: "Cart item updated", cartItem });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  router.delete("/delete", async (req, res) => {
    try {
        const { userId, productId } = req.body;

        // Check if userId and productId exist
        if (!userId || !productId) {
            return res.status(400).json({ message: "Missing userId or productId" });
        }

        console.log("Received Delete Request - userId:", userId, "productId:", productId);

        const cartItem = await Cart.findOne({ where: { userId, productId } });

        if (!cartItem) {
            return res.status(404).json({ message: "Cart item not found" });
        }

        await cartItem.destroy();
        res.status(200).json({ message: "Cart item deleted successfully" });
    } catch (error) {
        console.error("Error in delete route:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});


module.exports = router;

