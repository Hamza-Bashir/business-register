"use strict"

const {Model} = require("sequelize")

module.exports = (sequelize, DataTypes) => {

    class Customer extends Model{
        static associate(models){
            Customer.belongsTo(models.Business, {
                foreignKey:"business_id", as : "business"
            })
        }
    }

Customer.init({
    id:{
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
        primaryKey:true
    },
    business_id:{
        type:DataTypes.UUID,
        allowNull:false
    },
    name:{
        type:DataTypes.STRING,
    },
    email:{
        type:DataTypes.STRING
    },
    address:{
        type:DataTypes.STRING
    }
}, {
    sequelize, 
    modelName:"Customer",
    tableName:"Customers",
    timestamps:true
})
return Customer
}