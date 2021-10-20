// import express for request response types
import express from 'express';

import debug from 'debug';
import productsService from '../services/products.service';

const log: debug.IDebugger = debug('ap:products-controller');

class ProductsController {
  async listProducts(req: express.Request, res: express.Response) {
    const products = await productsService.list(100, 0);
    return res.status(200).send(products);
  }

  async listAllProducts(req: express.Request, res: express.Response) {
    const products = await productsService.listAll();
    return res.status(200).send(products);
  }

  async getProductById(req: express.Request, res: express.Response) {
    const product = await productsService.readById(req.body.id);
    return res.status(200).send(product);
  }

  async createProduct(req: express.Request, res: express.Response) {
    const productId = await productsService.create(req.body);
    return res.status(201).send({ id: productId });
  }

  async patch(req: express.Request, res: express.Response) {
    log(await productsService.patchById(req.body.id, req.body));
    return res.status(204).send();
  }

  async put(req: express.Request, res: express.Response) {
    log(await productsService.putById(req.body.id, req.body));
    return res.status(204).send();
  }
  async removeProduct(req: express.Request, res: express.Response) {
    log(await productsService.deleteById(req.body.id));
    res.status(204).send();
  }
}

export default new ProductsController();
