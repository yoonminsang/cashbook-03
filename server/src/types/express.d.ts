import { UserAttributes } from '../model/user';

declare global {
  namespace Express {
    interface User extends UserAttributes {}
  }
}
