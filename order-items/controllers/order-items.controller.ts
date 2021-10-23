// import express for request response types
import express from 'express';

import debug from 'debug';
import orderItemsService from '../services/order-items.service';

const log: debug.IDebugger = debug('ap:order-items-controller');

class OrderItemsController {
  async listOrderItems(req: express.Request, res: express.Response) {
    const orderItems = await orderItemsService.list(100, 0);
    return res.status(200).send(orderItems);
  }

  async listAllOrderItems(req: express.Request, res: express.Response) {
    const orderItems = await orderItemsService.listAll();
    return res.status(200).send(orderItems);
  }

  async getOrderItemById(req: express.Request, res: express.Response) {
    const orderItem = await orderItemsService.readById(req.body.id);
    return res.status(200).send(orderItem);
  }

  async createOrderItem(req: express.Request, res: express.Response) {
    const orderItemId = await orderItemsService.create(req.body);
    return res.status(201).send({ id: orderItemId });
  }

  async patch(req: express.Request, res: express.Response) {
    log(await orderItemsService.patchById(req.body.id, req.body));
    return res.status(204).send();
  }

  async put(req: express.Request, res: express.Response) {
    log(await orderItemsService.putById(req.body.id, req.body));
    return res.status(204).send();
  }
  async removeProduct(req: express.Request, res: express.Response) {
    log(await orderItemsService.deleteById(req.body.id));
    res.status(204).send();
  }
}

export default new OrderItemsController();
