"use strict"

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      Order.belongsTo(models.Customer, { foreignKey: "customer_id", as: "customer" });
      Order.belongsTo(models.Product, { foreignKey: "product_id", as: "product" }); 
      Order.belongsTo(models.Business, { foreignKey: "business_id", as: "business" });  
    }
  }

  Order.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    customer_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    product_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    business_id: {
      type: DataTypes.UUID,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: "Order",
    tableName: "Orders",
    timestamps: true
  });

  return Order;
};
