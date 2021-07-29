import { DataTypes, Sequelize, Model } from 'sequelize';

class User extends Model {}

export const initUser = async function (sequelize: Sequelize) {
  User.init(
    {
      id: {
        type: DataTypes.CHAR(36),
        primaryKey: true,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(40),
        allowNull: false,
      },
      password: {
        type: DataTypes.CHAR(60),
      },
      is_oauth: {
        type: DataTypes.STRING(20),
      },
      nickname: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
      sequelize,
      tableName: 'User',
    },
  );

  await User.sync();
  console.log('User synced');
};

export default User;