import express from 'express';
import productsService from '../services/products.service';
import debug from 'debug';

const log: debug.IDebugger = debug('app:products-middleware');

class ProductMiddleware {
  async validateSameNameDoesNotExist(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const product = await productsService.getByName(req.body.name);
    if (product) {
      return res
        .status(400)
        .send({ error: 'Product with that name already exists' });
    } else {
      next();
    }
  }

  async validateProductExists(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const product = await productsService.readById(req.params.productId);
    if (product) {
      next();
    } else {
      res.status(404).send({
        error: `Product ${req.params.productId} not found`,
      });
    }
  }

  async extractProductId(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    req.body.id = req.params.productId;
    next();
  }
}

export default new ProductMiddleware();
