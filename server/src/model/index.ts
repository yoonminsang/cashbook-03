import { initCategory } from './category';
import { initUser } from './user';
import { initPayment } from './payment';

export const modelInitFunctions: Function[] = [
  initCategory,
  initUser,
  initPayment,
];
