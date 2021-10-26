// import express for request response types
import express from 'express';

import debug from 'debug';
import ordersService from '../services/orders.service';

const log: debug.IDebugger = debug('ap:orders-controller');

class OrdersController {
  async listOrders(req: express.Request, res: express.Response) {
    const products = await ordersService.list(100, 0);
    return res.status(200).send(products);
  }

  async listAllOrders(req: express.Request, res: express.Response) {
    const products = await ordersService.listAll();
    return res.status(200).send(products);
  }

  async getOrderById(req: express.Request, res: express.Response) {
    const product = await ordersService.readById(req.body.id);
    return res.status(200).send(product);
  }

  async createOrder(req: express.Request, res: express.Response) {
    const productId = await ordersService.create(req.body);
    return res.status(201).send({ id: productId });
  }

  async patch(req: express.Request, res: express.Response) {
    log(await ordersService.patchById(req.body.id, req.body));
    return res.status(204).send();
  }

  async put(req: express.Request, res: express.Response) {
    log(await ordersService.putById(req.body.id, req.body));
    return res.status(204).send();
  }
  async removeOrder(req: express.Request, res: express.Response) {
    log(await ordersService.deleteById(req.body.id));
    res.status(204).send();
  }
}

export default new OrdersController();
