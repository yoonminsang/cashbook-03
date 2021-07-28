import Category from '../model/category';

export default class CategoryRepository {
  async getAll() {
    return await Category.findAll({
      attributes: ['name', 'is_income'],
    });
  }
}
