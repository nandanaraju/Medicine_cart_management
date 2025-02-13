const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const { verifyToken, authorizeRoles } = require("../middleware/authMiddleware");

router.post("/add", verifyToken, authorizeRoles("admin"), async (req, res) => {
    try {
        const {  productName, productDescription, productPrice, productQuantity } = req.body;
        
        const product = await Product.create({  productName, productDescription, productPrice, productQuantity });

        res.status(201).json({ message: "Product created successfully", product });
    } catch (error) {
        console.error("Product creation error:", error);
        res.status(500).json({ error: "Product creation failed" });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const product = await Product.findOne({ where: { id: req.params.id } });

        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }

        res.json(product);
    } catch (error) {
        console.error("Fetching product error:", error);
        res.status(500).json({ error: "Failed to fetch product" });
    }
});

router.get("/", async (req, res) => {
    try {
        const products = await Product.findAll();
        res.status(200).json(products);
    } catch (error) {
        console.error("Fetching products error:", error);
        res.status(500).json({ error: "Failed to fetch products" });
    }
});

router.put("/:id", verifyToken, authorizeRoles("admin"), async (req, res) => {
    try {
        const { productName, productDescription, productPrice, productQuantity } = req.body;
        
        const [updated] = await Product.update(
            { productName, productDescription, productPrice, productQuantity },
            { where: { id: req.params.id } }
        );

        if (!updated) {
            return res.status(404).json({ error: "Product not found" });
        }

        const updatedProduct = await Product.findOne({ where: { id: req.params.id } });

        res.status(200).json({ message: "Product updated successfully", product: updatedProduct });
    } catch (error) {
        console.error("Product update error:", error);
        res.status(500).json({ error: "Product update failed" });
    }
});

router.delete("/:id", verifyToken, authorizeRoles("admin"), async (req, res) => {
    try {
        const deleted = await Product.destroy({ where: { id: req.params.id } });

        if (!deleted) {
            return res.status(404).json({ error: "Product not found" });
        }

        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        console.error("Product deletion error:", error);
        res.status(500).json({ error: "Product deletion failed" });
    }
});

module.exports = router;
