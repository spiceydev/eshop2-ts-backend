import { CreateOrderItemDto } from '../dto/create.order-item.dto';
import { PutOrderItemDto } from '../dto/put.order-item.dto';
import { PatchOrderItemDto } from '../dto/patch.order-item.dto';
import shortid from 'shortid';
import debug from 'debug';
import mongooseService from '../../common/services/mongoose.service';
import { CreateUserDto } from '../../users/dto/create.user.dto';

const log: debug.IDebugger = debug('app:order-item-dao');

class OrderItemsDao {
  orderItems: Array<CreateOrderItemDto> = [];
  Schema = mongooseService.getMongoose().Schema;

  oderItemSchema = new this.Schema({
    quantity: {
      type: Number,
      required: true,
    },
    product: {
      type: this.Schema.Types.ObjectId,
      ref: 'Product',
    },
    discount: {
      type: Number,
      required: true,
    },
  });

  OrderItem = mongooseService
    .getMongoose()
    .model('OrderItems', this.oderItemSchema);

  constructor() {
    log('Created new instance of ProductsDao');
  }

  async addOderItem(orderItemFields: CreateOrderItemDto) {
    const orderItemID = shortid.generate();
    const orderItem = new this.OrderItem({
      _id: orderItemID,
      ...orderItemFields,
    });
    await orderItem.save();
    return orderItemID;
  }

  async getOrderItems(limit = 25, page = 0) {
    return this.OrderItem.find()
      .limit(limit)
      .skip(limit * page)
      .exec();
  }

  async getAllOrderItems() {
    return this.OrderItem.find().exec();
  }

  async getOrderItemById(orderItemId: string) {
    return this.OrderItem.findOne({ _id: orderItemId }).exec();
  }

  async updateOrderItemById(
    orderItemId: string,
    orderItemFields: PatchOrderItemDto | PutOrderItemDto
  ) {
    const existingOrderItem = await this.OrderItem.findOneAndUpdate(
      { _id: orderItemId },
      { $set: orderItemFields },
      { new: true }
    ).exec();
    return existingOrderItem;
  }

  async removeOrderItemById(orderItemId: string) {
    return this.OrderItem.deleteOne({ _id: orderItemId }).exec();
  }
}

export default new OrderItemsDao();
