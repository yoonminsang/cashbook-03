import { DataTypes, Sequelize, Model } from 'sequelize';

class Account extends Model {}

export const initAccount = async function (sequelize: Sequelize) {
  Account.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      content: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      timestamp: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
      timestamps: true,
      createdAt: 'created',
      updatedAt: false,
      sequelize,
      tableName: 'Account',
    },
  );

  await Account.sync();
  console.log('Account synced');
};

export default Account;
