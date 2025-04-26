'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Business extends Model {
    static associate(models) {
      Business.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    }
  }

  Business.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contact_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isApproved: {
      type: DataTypes.ENUM("pending", "accept", "reject"),
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Business',
    tableName: 'Businesses', 
    timestamps: true,         
  });

  return Business;
};
