import CategoryRepository from '../repository/category';

const categoryRepository = new CategoryRepository();

export default class CategoryService {
  async getCategories() {
    return await categoryRepository.getAll();
  }

  async getCategoryById(id: number) {
    return await categoryRepository.get(id);
  }
}
