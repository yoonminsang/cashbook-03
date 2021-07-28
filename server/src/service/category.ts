import CategoryRepository from '../repository/category';

const categoryRepository = new CategoryRepository();

export default class CategoryService {
  async getCategories() {
    const categories = await categoryRepository.getAll();
    if (!categories.length) throw new Error('NO_DATA');

    return categories;
  }

  async getCategoryById(id: number) {
    const category = await categoryRepository.get(id);
    if (!category) throw new Error('NO_DATA');

    return category;
  }
}
