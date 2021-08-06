import Category from '../model/category';

export default class CategoryRepository {
  async getAll() {
    return await Category.findAll();
  }

  async get(id: number) {
    return await Category.findByPk(id);
  }
}
