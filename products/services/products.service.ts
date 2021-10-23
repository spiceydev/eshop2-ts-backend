import { CRUD } from '../../common/interfaces/crud.interface';
import productsDao from '../daos/products.dao';
import { CreateProductDto } from '../dto/create.product.dto';
import { PatchProductDto } from '../dto/patch.product.dto';
import { PutProductDto } from '../dto/put.product.dto';

class ProductsService implements CRUD {
  list(limit: number, page: number) {
    return productsDao.getProducts(limit, page);
  }

  listAll() {
    return productsDao.getAllProducts();
  }

  async create(resource: CreateProductDto) {
    return productsDao.addProduct(resource);
  }

  async putById(id: string, resource: PutProductDto) {
    return productsDao.updateProductById(id, resource);
  }

  async patchById(id: string, resource: PatchProductDto) {
    return productsDao.updateProductById(id, resource);
  }

  async readById(id: string) {
    return productsDao.getProductById(id);
  }

  async deleteById(id: string) {
    return productsDao.removeProductById(id);
  }

  async getByName(name: string) {
    return productsDao.getProductByName(name);
  }
}

export default new ProductsService();
