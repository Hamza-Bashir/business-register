'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("Products", {
      id:{
        type:Sequelize.UUID,
        defaultValue:Sequelize.UUIDV4,
        allowNull:false,
        primaryKey:true
      },
      category_id:{
        type:Sequelize.UUID,
        allowNull:false,
        references:{
          model:"Categorys",
          key:"id"
        },
        onDelete:"CASCADE"
      },
      name:{
        type:Sequelize.STRING,
        allowNull:false
      },
      description:{
        type:Sequelize.STRING,
        allowNull:false
      },
      price:{
        type:Sequelize.FLOAT,
        allowNull:false
      },
      quantity:{
        type:Sequelize.INTEGER,
        allowNull:false
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
   await queryInterface.dropTable("Products")
  }
};
