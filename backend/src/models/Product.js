const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Product = sequelize.define("Product", {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    productName: { type: DataTypes.STRING, allowNull: false, unique: true },
    productDescription: { type: DataTypes.TEXT, allowNull: false },
    productPrice: { type: DataTypes.FLOAT, allowNull: false },
    productQuantity: { type: DataTypes.INTEGER, allowNull: false },
});

module.exports = Product;
