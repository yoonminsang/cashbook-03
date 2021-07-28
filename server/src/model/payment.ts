import { DataTypes, Sequelize, Model } from 'sequelize';

class Payment extends Model {}

export const initPayment = async function (sequelize: Sequelize) {
  Payment.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
      sequelize,
      tableName: 'Payment',
    },
  );

  await Payment.sync();
  console.log('Payment synced');
};

export default Payment;
