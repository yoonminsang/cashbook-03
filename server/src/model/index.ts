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
  Account.belongsTo(Category, { foreignKey: 'category_id' });
  Account.belongsTo(User, { foreignKey: 'user_id', onDelete: 'cascade' });
  Account.belongsTo(Payment, { foreignKey: 'payment_id', onDelete: 'cascade' });

  Payment.belongsTo(User, { foreignKey: 'user_id', onDelete: 'cascade' });
};
