import { CRUD } from '../../common/interfaces/crud.interface';
import ordersDao from '../daos/orders.dao';
import { CreateOrderDto } from '../dto/create.order.dto';
import { PatchOrderDto } from '../dto/patch.order.dto';
import { PutOrderDto } from '../dto/put.order.dto';

class OrdersService implements CRUD {
  list(limit: number, page: number) {
    return ordersDao.getOrders(limit, page);
  }

  listAll() {
    return ordersDao.getAllOrders();
  }

  async create(resource: CreateOrderDto) {
    return ordersDao.addOrder(resource);
  }

  async putById(id: string, resource: PutOrderDto) {
    return ordersDao.updateOrderById(id, resource);
  }

  async patchById(id: string, resource: PatchOrderDto) {
    return ordersDao.updateOrderById(id, resource);
  }

  async readById(id: string) {
    return ordersDao.getOrderById(id);
  }

  async deleteById(id: string) {
    return ordersDao.removeOrderById(id);
  }

  async getByName(name: string) {
    return ordersDao.getOrderByName(name);
  }
}

export default new OrdersService();
