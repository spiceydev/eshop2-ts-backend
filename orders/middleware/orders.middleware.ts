import express from 'express';
import debug from 'debug';
import ordersService from '../services/orders.service';

const log: debug.IDebugger = debug('app:orders-middleware');

class OrderMiddleware {
  async validateOrderExists(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const order = await ordersService.readById(req.params.orderId);
    if (order) {
      next();
    } else {
      res.status(404).send({
        error: `Order ${req.params.orderId} not found`,
      });
    }
  }

  async extractOrderId(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    req.body.id = req.params.orderId;
    next();
  }
}

export default new OrderMiddleware();
