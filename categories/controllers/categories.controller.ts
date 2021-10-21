// import express for request response types
import debug from 'debug';
import express from 'express';
import categoriesService from '../services/categories.service';

const log: debug.IDebugger = debug('ap:categories-controller');

class CategoriesController {
  async listCategories(req: express.Request, res: express.Response) {
    const categories = await categoriesService.list(100, 0);
    return res.status(200).send(categories);
  }

  async listAllCategories(req: express.Request, res: express.Response) {
    const categories = await categoriesService.listAll();
    return res.status(200).send(categories);
  }

  async getCategoryById(req: express.Request, res: express.Response) {
    const category = await categoriesService.readById(req.body.id);
    return res.status(200).send(category);
  }

  async createCategory(req: express.Request, res: express.Response) {
    const categoryId = await categoriesService.create(req.body);
    return res.status(201).send({ id: categoryId });
  }

  async patch(req: express.Request, res: express.Response) {
    log(await categoriesService.patchById(req.body.id, req.body));
    return res.status(204).send();
  }

  async put(req: express.Request, res: express.Response) {
    log(await categoriesService.putById(req.body.id, req.body));
    return res.status(204).send();
  }
  async removeCategory(req: express.Request, res: express.Response) {
    log(await categoriesService.deleteById(req.body.id));
    return res.status(204).send();
  }

  async getCategoryByName(req: express.Request, res: express.Response) {
    const category = await categoriesService.getCategoryByName(req.body.name);
    return res.status(200).send(category);
  }
}

export default new CategoriesController();
