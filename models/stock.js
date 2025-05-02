"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Stock extends Model {
        static associate(models) {
            Stock.belongsTo(models.Product, {
                foreignKey: "product_id",
                as: "product"
            });
        }
    }

    Stock.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        product_id: {
            type: DataTypes.UUID,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: "Stock",
        tableName: "Stock",
        timestamps: true
    });

    return Stock;
};
