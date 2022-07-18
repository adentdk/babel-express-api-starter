module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ChatRoom', {
      chatRoomId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
          model: 'ChatRoom',
        },
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
          model: 'User',
        },
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('ChatRoom');
  },
};
