import { initCategory } from './category';
import { initUser } from './user';
import { initPayment } from './payment';
import { initAccount } from './account';

export const modelInitFunctions: Function[] = [
  initCategory,
  initUser,
  initPayment,
  initAccount,
];
