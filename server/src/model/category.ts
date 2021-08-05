import { DataTypes, Sequelize, Model } from 'sequelize';

const INITIAL_DATA = [
  { name: '생활', is_income: false, color: '#4A6CC3' },
  { name: '식비', is_income: false, color: '#4CA1DE' },
  { name: '교통', is_income: false, color: '#94D3CC' },
  { name: '쇼핑/뷰티', is_income: false, color: '#4CB8B8' },
  { name: '의료/건강', is_income: false, color: '#6ED5EB' },
  { name: '문화/여가', is_income: false, color: '#D092E2' },
  { name: '기타', is_income: false, color: '#817DCE' },
  { name: '월급', is_income: true, color: '#B9D58C' },
  { name: '용돈', is_income: true, color: '#E6D267' },
  { name: '기타', is_income: true, color: '#E2B765' },
];

interface CategoryAttributes {
  id?: string;
  name: string;
  is_income: boolean;
  color: string;
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
      color: {
        type: DataTypes.CHAR(7),
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
    await Promise.all(
      INITIAL_DATA.map((row) => Category.build(row)).map((category) =>
        category.save(),
      ),
    );
  }
  console.log('Catgory Table Initialized');
};

export default Category;
