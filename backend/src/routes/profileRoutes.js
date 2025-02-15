const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const { verifyToken} = require("../middleware/authMiddleware");


router.get("/", verifyToken, async (req, res) => {
  try {
    const userId = req.user?.userId; // Ensure userId is coming from JWT

    if (!userId) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const user = await User.findByPk(userId, {
      attributes: { exclude: ["password"] },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const cartItems = await Cart.findAll({
      where: { userId },
      include: [
        {
          model: Product,
          attributes: ["productName", "productPrice"],
        },
      ],
    });

    res.status(200).json({ user, cart: cartItems });
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ message: "Failed to fetch profile", error: error.message });
  }
});


module.exports = router;
