import Category, { initCategory } from './category';
import User, { initUser } from './user';
import Payment, { initPayment } from './payment';
import Account, { initAccount } from './account';

export const modelInitFunctions: Function[] = [
  initCategory,
  initUser,
  initPayment,
  initAccount,
];

export const setRelations = () => {
  Category.hasMany(Account, { foreignKey: 'category_id' });
  User.hasMany(Account, { foreignKey: 'user_id', onDelete: 'cascade' });
  Payment.hasMany(Account, { foreignKey: 'payment_id', onDelete: 'cascade' });

  Payment.belongsTo(User, { foreignKey: 'user_id', onDelete: 'cascade' });
};
