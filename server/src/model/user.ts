import { DataTypes, Sequelize, Model } from 'sequelize';

export interface UserAttributes {
  id?: string;
  email: string;
  password?: string;
  provider?: string;
  nickname: string;
}

class User extends Model<UserAttributes> {}

export const initUser = async function (sequelize: Sequelize) {
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
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
      provider: {
        type: DataTypes.STRING(20),
        allowNull: false,
        defaultValue: 'local',
      },
      nickname: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
      timestamps: true,
      createdAt: 'created',
      updatedAt: false,
      sequelize,
      tableName: 'User',
    },
  );

  await User.sync();
  console.log('User synced');
};

export default User;
