'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.createTable("Stocks", {
      id:{
        type: Sequelize.UUID,
        defaultValue:Sequelize.UUIDV4,
        allowNull:false,
        primaryKey:true
      },
      product_id:{
        type:Sequelize.UUID,
        allowNull:false,
        references:{
          model:"Products",
          key:"id"
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
    })
   
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropAllTable("Stocks")
  }
};
