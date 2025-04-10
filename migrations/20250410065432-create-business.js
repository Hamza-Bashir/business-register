'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("Businesses", {
      id:{
        type:Sequelize.UUID,
        defaultValue:Sequelize.UUIDV4,
        allowNull:false,
        primaryKey:true
      },
      user_id:{

        type:Sequelize.UUID,
        allowNull:false,
        references:{
          model:"Users",
          key:"id"
        },
        onDelete:"CASCADE"
      },
      name:{
        type:Sequelize.STRING,
        allowNull:false
      },
      address:{
        type:Sequelize.STRING,
        allowNull:false
      },
      contact_number:{
        type:Sequelize.STRING,
        allowNull:false
      },
      isApproved:{

        type:Sequelize.BOOLEAN,
        defaultValue:false,
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
    await queryInterface.dropTable("Businesses")
  }
};
