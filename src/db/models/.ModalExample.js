import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
  class ModalExample extends Model {
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: 'createdBy',
        as: 'createdByUser',
      });
      this.belongsTo(models.User, {
        foreignKey: 'updatedBy',
        as: 'updatedByUser',
      });
      this.belongsTo(models.User, {
        foreignKey: 'deletedBy',
        as: 'deletedByUser',
      });
    }
  }

  ModalExample.init({
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
    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    updatedBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    deletedBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'ModalExample',
    freezeTableName: true,
    timestamps: true,
    paranoid: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    deletedAt: 'deletedAt',
  });

  return ModalExample;
};
