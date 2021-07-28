import Category from '../model/category';

export default class CategoryService {
  async getCategories() {
    return await Category.findAll({
      attributes: ['name', 'is_income'],
    });
  }
}
