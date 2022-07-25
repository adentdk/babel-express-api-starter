import { compareSync, hashSync } from 'bcrypt';
import { Model, DataTypes } from 'sequelize';
import { sign } from 'jsonwebtoken';
import config from '@config/config';

export default (sequelize) => {
  class User extends Model {
    static associate(models) {
      this.belongsToMany(models.ChatRoom, {
        foreignKey: 'userId',
        as: 'chatRooms',
        through: models.ChatParticipant,
      });
    }

    static findByUsername(username, { where, ...options } = {}) {
      return this.findOne({
        where: {
          username,
          ...where,
        },
        ...options,
      });
    }

    comparePassword(plainPassword) {
      return compareSync(plainPassword, this.password);
    }

    createTokens() {
      return {
        accessToken: sign({ username: this.username }, config.jwt.secretKey, {
          expiresIn: config.jwt.expiresIn,
        }),
        refreshToken: sign({ username: this.username }, config.jwt.refreshSecretKey, {
          expiresIn: config.jwt.refreshExpiresIn,
        }),
      };
    }
  }

  User.init({
    fullName: DataTypes.STRING(64),
    username: DataTypes.STRING(32),
    isActive: DataTypes.BOOLEAN,
    password: {
      type: DataTypes.STRING(64),
      set(value) {
        if (value) {
          this.setDataValue('password', hashSync(value, 10));
        }
      },
    },
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
    modelName: 'User',
    freezeTableName: true,
    timestamps: true,
    paranoid: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    deletedAt: 'deletedAt',
  });

  return User;
};
