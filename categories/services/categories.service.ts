import { CRUD } from '../../common/interfaces/crud.interface';
import categoriesDao from '../daos/categories.dao';
import { CreateCategoryDto } from '../dto/create.category.dto';
import { PatchCategoryDto } from '../dto/patch.category.dto';
import { PutCategoryDto } from '../dto/put.category.dto';

class CategoriesService implements CRUD {
  async list(limit: number, page: number) {
    return categoriesDao.getCategories(limit, page);
  }
  async listAll() {
    return categoriesDao.getAllCategories();
  }
  async create(resource: CreateCategoryDto) {
    return categoriesDao.addCategory(resource);
  }

  async putById(id: string, resource: PutCategoryDto) {
    return categoriesDao.updateCategoryById(id, resource);
  }

  async patchById(id: string, resource: PatchCategoryDto) {
    return categoriesDao.updateCategoryById(id, resource);
  }

  async readById(id: string) {
    return categoriesDao.getCategoryById(id);
  }

  async deleteById(id: string) {
    return categoriesDao.removeCategoryById(id);
  }

  async getCategoryByName(email: string) {
    return categoriesDao.getCategoryByName(email);
  }
}

export default new CategoriesService();
