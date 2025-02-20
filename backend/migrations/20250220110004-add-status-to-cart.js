module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Carts", "status", {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "To Do",  // Default value for existing records
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Carts", "status");
  },
};
