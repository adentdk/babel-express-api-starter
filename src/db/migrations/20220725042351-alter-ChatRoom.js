module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    await queryInterface.addColumn('ChatRoom', 'name', {
      type: Sequelize.STRING,
    });

    await queryInterface.addColumn('ChatRoom', 'type', {
      type: Sequelize.ENUM('personal', 'group'),
      allowNull: false,
      defaultValue: 'personal',
    });
  },

  async down(queryInterface) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    await queryInterface.removeColumn('ChatRoom', 'name');
    await queryInterface.removeColumn('ChatRoom', 'type');
  },
};
