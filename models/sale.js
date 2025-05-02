"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Sale extends Model {
        static associate(models) {
            Sale.belongsTo(models.Product, {
                foreignKey: "product_id",
                as: "product"
            });
        }
    }

    Sale.init({
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
        modelName: "Sale",
        tableName: "Sale",
        timestamps: true
    });

    return Sale;
};
