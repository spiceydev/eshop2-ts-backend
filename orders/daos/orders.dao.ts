import debug from 'debug';
import shortid from 'shortid';
import mongooseService from '../../common/services/mongoose.service';
import { CreateOrderDto } from '../dto/create.order.dto';
import { PatchOrderDto } from '../dto/patch.order.dto';
import { PutOrderDto } from '../dto/put.order.dto';

const log: debug.IDebugger = debug('app:order-dao');

class OrdersDao {
  orders: Array<CreateOrderDto> = [];
  Schema = mongooseService.getMongoose().Schema;

  constructor() {
    log('Created new instance of OrdersDao');
  }

  orderSchema = new this.Schema({
    orderItems: [
      {
        type: this.Schema.Types.ObjectId,
        ref: 'OrderItems',
        required: true,
      },
    ],
    shippingAddress1: {
      type: String,
      required: true,
    },
    shippingAddress2: {
      type: String,
    },
    city: {
      type: String,
      required: true,
    },
    zip: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: 'Pending',
    },
    totalPrice: {
      type: Number,
    },
    user: {
      type: this.Schema.Types.ObjectId,
      ref: 'Users',
    },
    dateOrdered: {
      type: Date,
      default: Date.now,
    },
  });

  Order = mongooseService.getMongoose().model('Orders', this.orderSchema);

  async addOrder(orderFields: CreateOrderDto) {
    const orderId = shortid.generate();
    const user = new this.Order({
      _id: orderId,
      ...orderFields,
    });
    await user.save();
    return orderId;
  }

  async getOrders(limit = 25, page = 0) {
    return this.Order.find()
      .limit(limit)
      .skip(limit * page)
      .exec();
  }

  async getAllOrders() {
    return this.Order.find();
  }

  async getOrderById(ordersId: string) {
    return this.Order.findOne({ _id: ordersId }).exec();
  }

  async updateOrderById(
    ordersId: string,
    orderFields: PatchOrderDto | PutOrderDto
  ) {
    const existingOrder = await this.Order.findOneAndUpdate(
      { _id: ordersId },
      { $set: orderFields },
      { new: true }
    ).exec();
    return existingOrder;
  }

  async removeOrderById(ordersId: string) {
    return this.Order.deleteOne({ _id: ordersId }).exec();
  }

  async getOrderByName(name: string) {
    return this.Order.findOne({ name: name }).exec();
  }
}

export default new OrdersDao();
