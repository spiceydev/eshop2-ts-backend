import debug from 'debug';
import express from 'express';
import categoriesService from '../services/categories.service';

const log: debug.IDebugger = debug('app:categories-middleware');

class CategoryMiddleware {
  async validateSameNameDoesNotExist(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const category = await categoriesService.getCategoryByName(req.body.name);
    if (category) {
      return res
        .status(400)
        .send({ error: 'Category with that name already exists' });
    } else {
      next();
    }
  }

  async validateCategoryExists(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const category = await categoriesService.readById(req.params.category);
    if (category) {
      next();
    } else {
      res.status(404).send({
        error: `Category ${req.params.categoryId} not found`,
      });
    }
  }

  async extractCategoryId(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    req.body.id = req.params.categoryId;
    next();
  }
}

export default new CategoryMiddleware();
