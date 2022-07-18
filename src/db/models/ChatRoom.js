import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
  class ChatRoom extends Model {
    static associate(models) {
      this.hasMany(models.ChatMessage, {
        foreignKey: 'chatRoomId',
        as: 'messages',
      });
      this.belongsToMany(models.User, {
        foreignKey: 'userId',
        as: 'users',
        through: models.ChatParticipant,
      });
    }
  }

  ChatRoom.init({
    description: DataTypes.STRING,
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
    modelName: 'ChatRoom',
    freezeTableName: true,
    timestamps: true,
    paranoid: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    deletedAt: 'deletedAt',
  });

  return ChatRoom;
};
