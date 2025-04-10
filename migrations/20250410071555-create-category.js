'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("Categorys", {

      id:{
        type:Sequelize.UUID,
        defaultValue:Sequelize.UUIDV4,
        allowNull:false,
        primaryKey:true
      },
      business_id:{
        type:Sequelize.UUID,
        allowNull:false,
        references:{
          model:"Businesses",
          key:"id"
        },
        onDelete:"CASCADE"
      },
      name:{
        type:Sequelize.STRING,
        allowNull:false
      },
      createdAt:{
        allowNull:false,
        type:Sequelize.DATE,
        defaultValue:Sequelize.literal("CURRENT_TIMESTAMP")
      },
      updatedAt:{
        allowNull:false,
        type:Sequelize.DATE,
        defaultValue:Sequelize.literal("CURRENT_TIMESTAMP")
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable("Categorys")
  }
};
