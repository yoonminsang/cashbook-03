import { DataTypes, Sequelize, Model } from 'sequelize';

const INITIAL_DATA = [
  { name: '생활', is_income: false },
  { name: '식비', is_income: false },
  { name: '교통', is_income: false },
  { name: '쇼핑/뷰티', is_income: false },
  { name: '의료/건강', is_income: false },
  { name: '문화/여가', is_income: false },
  { name: '기타', is_income: false },
  { name: '월급', is_income: true },
  { name: '용돈', is_income: true },
  { name: '기타', is_income: true },
];

interface CategoryAttributes {
  id?: string;
  name: string;
  is_income: boolean;
}

class Category extends Model<CategoryAttributes> {}

export const initCategory = async function (sequelize: Sequelize) {
  Category.init(
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
      is_income: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
      sequelize,
      tableName: 'Category',
    },
  );

  await Category.sync();
  console.log('Category synced');

  const rows = await Category.findAll();
  if (!rows.length) {
    await Promise.all(INITIAL_DATA.map((row) => Category.create(row)));
  }
  console.log('Catgory Table Initialized');
};

export default Category;
