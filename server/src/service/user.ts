import UserRepository from '../repository/user';
import PaymentService from './payment';

const userRepository = new UserRepository();
const paymentService = new PaymentService();

export default class UserService {
  async getUserById(id: string) {
    const user = await userRepository.get(id);
    if (!user) throw new Error('NO_DATA');

    return user;
  }

  async signUp(email: string, password: string, nickname: string) {
    const existEmail = await userRepository.getByEmail(email);
    if (existEmail) throw new Error('EMAIL_DUPLICATE');

    const user = await userRepository.insertUser(email, password, nickname);
    await paymentService.addInitialPayments(user.id);

    return 'singup success';
  }
}
