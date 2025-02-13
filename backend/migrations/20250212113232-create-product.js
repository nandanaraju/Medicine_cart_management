module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Products", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      productName: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      productDescription: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      productPrice: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      productQuantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Products");
  },
};
