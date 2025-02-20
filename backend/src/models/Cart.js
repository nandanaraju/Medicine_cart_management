// const { DataTypes } = require("sequelize");
// const sequelize = require("../config/database");
// const User = require("./User");
// const Product = require("./Product");

// const Cart = sequelize.define("Cart", {
//   id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
//   quantity: { type: DataTypes.INTEGER, allowNull: false },
// });

// Cart.belongsTo(User, { foreignKey: "userId",onDelete:"CASCADE" });
// Cart.belongsTo(Product, { foreignKey: "productId",onDelete:"CASCADE" });

// module.exports = Cart;

const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User");
const Product = require("./Product");

const Cart = sequelize.define("Cart", {
  id: { 
    type: DataTypes.UUID, 
    defaultValue: DataTypes.UUIDV4, 
    primaryKey: true 
  },
  quantity: { 
    type: DataTypes.INTEGER, 
    allowNull: false 
  },
  status: { 
    type: DataTypes.STRING, 
    allowNull: false, 
    defaultValue: "To Do"  // Default status
  }
});

Cart.belongsTo(User, { foreignKey: "userId", onDelete: "CASCADE" });
Cart.belongsTo(Product, { foreignKey: "productId", onDelete: "CASCADE" });

module.exports = Cart;

