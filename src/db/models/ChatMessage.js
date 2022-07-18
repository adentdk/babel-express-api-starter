import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
  class ChatMessage extends Model {
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: 'senderId',
        as: 'sender',
      });
      this.belongsTo(models.ChatRoom, {
        foreignKey: 'chatRoomId',
        as: 'room',
      });
    }
  }

  ChatMessage.init({
    content: DataTypes.TEXT,
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
    modelName: 'ChatMessage',
    freezeTableName: true,
    timestamps: true,
    paranoid: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    deletedAt: 'deletedAt',
  });

  return ChatMessage;
};
