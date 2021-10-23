import { CRUD } from '../../common/interfaces/crud.interface';
import orderItemsDao from '../daos/order-item.dao';
import { CreateOrderItemDto } from '../dto/create.order-item.dto';
import { PatchOrderItemDto } from '../dto/patch.order-item.dto';
import { PutOrderItemDto } from '../dto/put.order-item.dto';

class OrderItemsService implements CRUD {
  list(limit: number, page: number) {
    return orderItemsDao.getOrderItems(limit, page);
  }

  listAll() {
    return orderItemsDao.getAllOrderItems();
  }

  async create(resource: CreateOrderItemDto) {
    return orderItemsDao.addOderItem(resource);
  }

  async putById(id: string, resource: PutOrderItemDto) {
    return orderItemsDao.updateOrderItemById(id, resource);
  }

  async patchById(id: string, resource: PatchOrderItemDto) {
    return orderItemsDao.updateOrderItemById(id, resource);
  }

  async readById(id: string) {
    return orderItemsDao.getOrderItemById(id);
  }

  async deleteById(id: string) {
    return orderItemsDao.removeOrderItemById(id);
  }
}

export default new OrderItemsService();
