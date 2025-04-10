'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("Orders", {
      id:{
        type:Sequelize.UUID,
        defaultValue:Sequelize.UUIDV4,
        allowNull:false,
        primaryKey:true
      },
      customer_id:{
        type:Sequelize.UUID,
        allowNull:false,
        references:{
          model:"Customers",
          key:"id"
        },
        onDelete:"CASCADE"
      },
      product_id:{
        type:Sequelize.UUID,
        allowNull:false,
        references:{
          model:"Products",
          key:"id"
        },
        onDelete:"CASCADE"
      },
      createdAt:{
        type:Sequelize.DATE,
        allowNull:false,
        defaultValue:Sequelize.literal("CURRENT_TIMESTAMP")
      },
      updatedAt:{
        type:Sequelize.DATE,
        allowNull:false,
        defaultValue:Sequelize.literal("CURRENT_TIMESTAMP")
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable("Orders")
  }
};
