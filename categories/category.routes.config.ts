import express from 'express';
import { body } from 'express-validator';
import { CommonRoutesConfig } from '../common/common.routes.config';
import bodyValidationMiddleware from '../common/middleware/body.validation.middleware';
import categoriesController from './controllers/categories.controller';
import categoryMiddleware from './middleware/category.middleware';
import permissionMiddleware from '../common/middleware/common.permission.middleware';
import { PermissionFlag } from '../common/middleware/common.permissionflag.enum';
import jwtMiddleware from '../auth/middleware/jwt.middleware';

export class CategoriesRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, 'CategoriesRoutes');
  }

  configureRoutes(): express.Application {
    this.app
      .route('/categories')
      .get(categoriesController.listCategories)
      .post(
        body('name').isString(),
        body('icon').isString(),
        body('color').isString(),
        bodyValidationMiddleware.verifyBodyFieldsErrors,
        categoryMiddleware.validateSameNameDoesNotExist,
        permissionMiddleware.permissionFlagRequired(
          PermissionFlag.ADMIN_PERMISSION
        ),
        categoriesController.createCategory
      );

    this.app.param('categoryId', categoryMiddleware.extractCategoryId);
    this.app
      .route('/categories/:categoryId')
      .get(categoriesController.getCategoryById);

    this.app
      .route('/categories/:categoryId')
      .delete(
        categoryMiddleware.validateCategoryExists,
        jwtMiddleware.validJWTNeeded,
        permissionMiddleware.permissionFlagRequired(
          PermissionFlag.ADMIN_PERMISSION
        ),
        categoriesController.removeCategory
      );

    this.app.put('/categories/:categoryId', [
      body('name').isString(),
      body('icon').isString(),
      body('color').isString(),
      bodyValidationMiddleware.verifyBodyFieldsErrors,
      permissionMiddleware.permissionFlagRequired(
        PermissionFlag.ADMIN_PERMISSION
      ),
      categoriesController.put,
    ]);

    this.app.patch('/categories/:categoryId', [
      body('name').isString().optional(),
      body('icon').isString().optional(),
      body('color').isString().optional(),
      bodyValidationMiddleware.verifyBodyFieldsErrors,
      permissionMiddleware.permissionFlagRequired(
        PermissionFlag.ADMIN_PERMISSION
      ),
      categoriesController.patch,
    ]);
    return this.app;
  }
}
