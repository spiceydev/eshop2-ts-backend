import express from 'express';
import { body } from 'express-validator';
import jwtMiddleware from '../auth/middleware/jwt.middleware';
import { CommonRoutesConfig } from '../common/common.routes.config';
import bodyValidationMiddleware from '../common/middleware/body.validation.middleware';
import permissionMiddleware from '../common/middleware/common.permission.middleware';
import { PermissionFlag } from '../common/middleware/common.permissionflag.enum';
import usersMiddleware from '../users/middleware/users.middleware';
import ordersController from './controllers/orders.controller';
import ordersMiddleware from './middleware/orders.middleware';

export class OrdersRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, 'OrdersRoutes');
  }
  configureRoutes(): express.Application {
    this.app
      .route('/orders')
      .get(
        jwtMiddleware.validJWTNeeded,
        permissionMiddleware.onlySameUserOrAdminCanDoThisAction,
        ordersController.listOrders
      )
      .post(
        body('orderItems.*').isString(),
        body('shippingAddress1').isString(),
        body('shippingAddress2').isString(),
        body('city').isString(),
        body('zip').isString(),
        body('country').isString(),
        body('phone').isString(),
        body('status').isString(),
        body('totalPrice').isNumeric(),
        body('user').isString(),
        body('date').isDate(),
        jwtMiddleware.validJWTNeeded,
        bodyValidationMiddleware.verifyBodyFieldsErrors,
        permissionMiddleware.permissionFlagRequired(
          PermissionFlag.ADMIN_PERMISSION
        ),
        ordersController.createOrder
      );

    this.app.param('orderId', ordersMiddleware.extractOrderId);

    this.app.route('/orders/:orderId').get(ordersController.getOrderById);

    this.app
      .route('/orders/:orderId')
      .delete(
        ordersMiddleware.validateOrderExists,
        jwtMiddleware.validJWTNeeded,
        permissionMiddleware.permissionFlagRequired(
          PermissionFlag.ADMIN_PERMISSION
        ),
        ordersController.removeOrder
      );

    this.app.put('/orders/:orderId', [
      body('orderItems.*').isString(),
      body('shippingAddress1').isString(),
      body('shippingAddress2').isString(),
      body('city').isString(),
      body('zip').isString(),
      body('country').isString(),
      body('phone').isString(),
      body('status').isString(),
      body('totalPrice').isNumeric(),
      body('user').isString(),
      body('date').isDate(),
      jwtMiddleware.validJWTNeeded,
      bodyValidationMiddleware.verifyBodyFieldsErrors,
      permissionMiddleware.permissionFlagRequired(
        PermissionFlag.ADMIN_PERMISSION
      ),
      ordersController.put,
    ]);

    this.app.patch('/orders/:orderId', [
      body('orderItems.*').isString().optional(),
      body('shippingAddress1').isString().optional(),
      body('shippingAddress2').isString().optional(),
      body('city').isString().optional(),
      body('zip').isString().optional(),
      body('country').isString().optional(),
      body('phone').isString().optional(),
      body('status').isString().optional(),
      body('totalPrice').isNumeric().optional(),
      body('user').isString().optional(),
      body('date').isDate().optional(),
      jwtMiddleware.validJWTNeeded,
      bodyValidationMiddleware.verifyBodyFieldsErrors,
      permissionMiddleware.permissionFlagRequired(
        PermissionFlag.ADMIN_PERMISSION
      ),
      ordersController.patch,
    ]);

    return this.app;
  }
}
