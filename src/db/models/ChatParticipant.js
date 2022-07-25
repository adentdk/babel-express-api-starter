import { Model } from 'sequelize';

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

  ChatParticipant.init({}, {
    sequelize,
    modelName: 'ChatParticipant',
    freezeTableName: true,
    timestamps: false,
  });

  return ChatParticipant;
};
