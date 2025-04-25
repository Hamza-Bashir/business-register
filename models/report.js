'use strict';
const {
  Model, Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class replyReportWithdrawTransaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  replyReportWithdrawTransaction .init({
    id:{
        type:DataTypes.UUID,
        defaultValue:Sequelize.UUIDV4,
        primaryKey:true
    },
    created: {
        type: DataTypes.DATE,
        field: "created", 
        defaultValue: Sequelize.NOW,
      },
      updated: {
        type: DataTypes.DATE,
        field: "updated",
        defaultValue: Sequelize.NOW,
      },
      deleted: {
        type: DataTypes.DATE,
        field: "deleted",
      },
     message:{
        type:DataTypes.STRING
     },
     withdrawTransactionId:{
        type:DataTypes.UUID
     }
  }, {
    sequelize,
    modelName: 'replyReportWithdrawTransaction ',
    tableName: 'reply_report_withdraw_transaction',
    timestamps: true,
    createdAt: "created",
    updatedAt: "updated",
    deletedAt:"deleted"
  });
  return replyReportWithdrawTransaction ;
};