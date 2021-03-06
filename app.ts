import dotenv from 'dotenv';
const dotenvResult = dotenv.config();
if (dotenvResult.error) {
  throw dotenvResult.error;
}

import express from 'express';
import * as http from 'http';
import * as winston from 'winston';
import * as expressWinston from 'express-winston';
import cors from 'cors';
import { CommonRoutesConfig } from './common/common.routes.config';
import { UsersRoutes } from './users/user.routes.config';
import { AuthRoutes } from './auth/auth.routes.config';
import debug from 'debug';
import helmet from 'helmet';
import { ProductsRoutes } from './products/product.routes.config';
import { CategoriesRoutes } from './categories/category.routes.config';
import { OrdersRoutes } from './orders/orders.routes.config';

const app: express.Application = express();
const server: http.Server = http.createServer(app);
const port = 3000;
const routes: CommonRoutesConfig[] = [];
const debugLog: debug.IDebugger = debug('app');

// add middleware to pass all requests as JSON
app.use(express.json());

// add middleware to allow cross-origin requests
app.use(cors());

app.use(helmet());

// prepare the expressWinston logging middleware configuration,
// which will automatically log all HTTP requests handled by Express.js
const loggerOPtions: expressWinston.LoggerOptions = {
  transports: [new winston.transports.Console()],
  format: winston.format.combine(
    winston.format.json(),
    winston.format.prettyPrint(),
    winston.format.colorize({ all: true })
  ),
};

if (!process.env.DEBUG) {
  loggerOPtions.meta = false; // when not debugging, log all requests as one-liners
  if (typeof global.it === 'function') {
    loggerOPtions.level = 'http'; // for non-debug test runs, squelch entirely
  }
}

// initialize the logger with the above config
app.use(expressWinston.logger(loggerOPtions));

// adding all routes to the routes array,
// after sending the Express.js application object to have the routes added to the app!
routes.push(new UsersRoutes(app));
routes.push(new AuthRoutes(app));
routes.push(new ProductsRoutes(app));
routes.push(new CategoriesRoutes(app));
routes.push(new OrdersRoutes(app));

// this is a simple route to make sure everything is working properly
const runningMessage = `Server running at http://localhost:${port}`;
app.get('/', (req: express.Request, res: express.Response) => {
  res.status(200).send(runningMessage);
});

export default server.listen(port, () => {
  routes.forEach((route: CommonRoutesConfig) => {
    debugLog(`Routes configured for ${route.getName()}`);
  });
  // our only exception to avoiding console.log(), because we
  // always want to know when the server is done starting up
  console.log(runningMessage);
});
