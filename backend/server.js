const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./src/routes/authRoutes");
const productRoutes = require("./src/routes/productRoutes");
const sequelize = require("./src/config/database");
const cartRoutes = require("./src/routes/cartRoutes");
const profileRoutes = require("./src/routes/profileRoutes");

const app = express();

app.use(
    cors({
        origin: "http://localhost:5173", 
        credentials: true, 
    })
);
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/profile", profileRoutes);




sequelize.sync().then(() => console.log("Database connected"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
