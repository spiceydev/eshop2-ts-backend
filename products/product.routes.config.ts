import express from 'express';

import { body } from 'express-validator';
import bodyValidationMiddleware from '../common/middleware/body.validation.middleware';
import jwtMiddleware from '../auth/middleware/jwt.middleware';
import permissionMiddleware from '../common/middleware/common.permission.middleware';
import { PermissionFlag } from '../common/middleware/common.permissionflag.enum';
import { CommonRoutesConfig } from '../common/common.routes.config';
import productsController from './controllers/products.controller';
import productMiddleware from './middleware/product.middleware';

export class ProductsRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, 'ProductsRoutes');
  }
  configureRoutes(): express.Application {
    this.app
      .route('/products')
      .get(productsController.listProducts)
      .post(
        body('name').isString(),
        body('description').isString(),
        body('richDescription').isString(),
        body('image').isString(),
        body('images').isArray().optional(),
        body('brand').isString(),
        body('price').isNumeric(),
        body('discount').isNumeric(),
        body('category').isString(),
        body('countInStock').isNumeric(),
        body('rating').isNumeric(),
        body('numReviews').isNumeric(),
        body('isFeatured').isBoolean(),
        body('dateCreated').isDate(),
        bodyValidationMiddleware.verifyBodyFieldsErrors,
        productMiddleware.validateSameNameDoesNotExist,
        permissionMiddleware.permissionFlagRequired(
          PermissionFlag.ADMIN_PERMISSION
        ),
        productsController.createProduct
      );

    this.app.param('productId', productMiddleware.extractProductId);
    this.app
      .route('/products/:productId')
      .get(productsController.getProductById);

    this.app
      .route('/products/:productId')
      .delete(
        productMiddleware.validateProductExists,
        jwtMiddleware.validJWTNeeded,
        permissionMiddleware.permissionFlagRequired(
          PermissionFlag.ADMIN_PERMISSION
        ),
        productsController.removeProduct
      );

    this.app.put('/products/:productId', [
      body('name').isString(),
      body('description').isString(),
      body('richDescription').isString(),
      body('image').isString(),
      body('images').isArray().optional(),
      body('brand').isString(),
      body('price').isNumeric(),
      body('discount').isNumeric(),
      body('category').isString(),
      body('countInStock').isNumeric(),
      body('rating').isNumeric(),
      body('numReviews').isNumeric(),
      body('isFeatured').isBoolean(),
      body('dateCreated').isDate(),
      bodyValidationMiddleware.verifyBodyFieldsErrors,
      permissionMiddleware.permissionFlagRequired(
        PermissionFlag.ADMIN_PERMISSION
      ),
      productsController.put,
    ]);

    this.app.patch('/products/:productId', [
      body('name').isString().optional(),
      body('description').isString().optional(),
      body('richDescription').isString().optional(),
      body('image').isString().optional(),
      body('images').isArray().optional().optional(),
      body('brand').isString().optional(),
      body('price').isNumeric().optional(),
      body('discount').isNumeric().optional(),
      body('category').isString().optional(),
      body('countInStock').isNumeric().optional(),
      body('rating').isNumeric().optional(),
      body('numReviews').isNumeric().optional(),
      body('isFeatured').isBoolean().optional(),
      body('dateCreated').isDate().optional(),
      bodyValidationMiddleware.verifyBodyFieldsErrors,
      permissionMiddleware.permissionFlagRequired(
        PermissionFlag.ADMIN_PERMISSION
      ),
      productsController.patch,
    ]);
    return this.app;
  }
}
