import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
  class ChatParticipant extends Model {
    static associate(models) {
      this.belongsTo(models.ChatRoom, {
        foreignKey: 'chatRoomId',
        as: 'room',
      });
      this.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
      });
    }
  }

  ChatParticipant.init({
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'ChatParticipant',
    freezeTableName: true,
    timestamps: true,
    paranoid: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    deletedAt: 'deletedAt',
  });

  return ChatParticipant;
};
